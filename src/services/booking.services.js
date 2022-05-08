const databaseService = require("./database.services");
const moment = require('moment');
const emailService = require("./email.services");
const { APISmartCitizenDeviceURL, desiredCourtTemperature, desiredCourtHumidity, sensorsIds } = require("../config");
const  axios = require("axios");

function getCourts() {
    return new Promise((resolve, reject) => {
        databaseService.getCourts().then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        }); 
    });
}
    
function book(userId, courtName, bookingDate, withLight) {
    return new Promise((resolve, reject) => {
        databaseService.getCourtData(courtName).then((courtData) => {
            var date = moment(bookingDate, "YYYY-MM-DD HH:mm");
            var light = true;
            if (withLight === "false") {
                light = false;
            }
            var amountToPay = light ? courtData.priceWithLight : courtData.priceWithoutLight;
            databaseService.bookCourt(userId, courtData.id, courtData.bookReservationTime, date, light, amountToPay).then((bookingData) => {
                databaseService.getUserData(userId).then((userData) => {
                    emailService.sendBookingConfirmationMail(userData.email, userData.name, bookingData.day, bookingData.startTime, bookingData.finishTime, courtName, bookingData.withLight, bookingData.amountToPay);
                    return resolve("Reserva realizada con éxito");
                }).catch(((err) => {
                    return reject(err);
                }));
            }).catch((err) => {
                return reject(err);
            });    
        }).catch((err) => {
            return reject(err);
        });
    });
}

function getBookings(userId, fromDay, toDay, onlyActiveBookings) {
    var onlyActive = true;
    if (onlyActiveBookings === "false") {
        onlyActive = false;
    }
    return new Promise((resolve, reject) => {
        if (onlyActive) {  
            databaseService.getActiveBookings(userId, fromDay, toDay).then((bookings) => {
                return resolve(bookings);
            }).catch((err) => {
                return reject(err);
            });
        } else {
            databaseService.getAllBookings(userId, fromDay, toDay).then((bookings) => {
                return resolve(bookings);
            }).catch((err) => {
                return reject(err);
            });
        }
    });
}

function cancelBooking(userId, bookingId) {
    return new Promise((resolve, reject) => {
        databaseService.cancelBooking(userId, bookingId).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}


function getAvailableTimes(bookingDay, courtName) {
    return new Promise((resolve, reject) => {
        databaseService.getCourtData(courtName).then((courtData) => {
            databaseService.getCourtDisponibility(bookingDay, courtName).then((bookings) => {
                var starts = moment(bookingDay + " " + courtData.opensAt, "YYYY/MM/DD HH:mm");
                const finishes = moment(bookingDay + " " + courtData.closesAt, "YYYY/MM/DD HH:mm");
                const currentTime = moment();
                var availableTimes = [];
                var i = 0;
                while (starts <= finishes) {
                    if (i < bookings.length) {
                        if (starts.format("HH:mm:ss") === bookings[i].startTime) {
                            i++;
                        } else {
                            if (starts >= currentTime) {
                                availableTimes.push(starts.format("HH:mm"));
                            }
                        } 
                    } else {
                        if (starts >= currentTime) {
                            availableTimes.push(starts.format("HH:mm"));
                        }
                    }
                    starts.add(courtData.bookReservationTime, "minutes");
                }
                return resolve(availableTimes);
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}


function getDisponibility(bookingDay, courtName) {
    return new Promise((resolve, reject) => {
        databaseService.getCourtData(courtName).then((courtData) => {
            getAvailableTimes(bookingDay, courtName).then((disponibilityData) => {
                var promises = [];
                disponibilityData.forEach(disponibleTime => {
                    promises.push(fetchLastWeekData(courtData.smartCitizenId, disponibleTime, courtData.bookReservationTime));
                });

                Promise.all(promises).then((newDisponibilityData) => {
                    newDisponibilityData.sort((a, b) => {
                        var dateA = moment(a.time, "HH:mm");
                        var dateB = moment(b.time, "HH:mm");
                        if (dateA > dateB) {
                            return 1;
                        } else {
                            return -1;
                        }
                    });              
                    return resolve(newDisponibilityData);
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function fetchLastWeekData(smartCitizenId, disponibilityTime, bookReservationTime) {
    return new Promise((resolve, reject) => {
        var promises = [];
        sensorsIds.forEach(sensorId => {
            promises.push(fetchLastWeekDataFromSensor(smartCitizenId, disponibilityTime, bookReservationTime, sensorId));
        });
        
        Promise.all(promises).then((data) => {
            const tempDiff = Math.abs(data[0].avg - desiredCourtTemperature) / 100;
            const humDiff = Math.abs(data[1].avg - desiredCourtHumidity) / 100;

            newDisponibilityTime = {};
            newDisponibilityTime.time = disponibilityTime;
            newDisponibilityTime.avg = tempDiff + humDiff;
            return resolve(newDisponibilityTime);
        }).catch(() => {
            newDisponibilityTime = {};
            newDisponibilityTime.time = disponibilityTime;
            newDisponibilityTime.avg = null;
            return resolve(disponibilityTime);
        });
    });
}

function fetchLastWeekDataFromSensor(smartCitizenId, disponibilityTime, bookReservationTime, sensorId) {
    return new Promise((resolve, reject) => {
        var fromDate = moment(disponibilityTime, "HH:mm").subtract(1, "days");
        var toDate = fromDate.clone().add(bookReservationTime, "minutes");
        
        var promises = [];
        for (var i = 0; i < 5; i++) {
            const url = `https://api.smartcitizen.me/v0/devices/${smartCitizenId}/readings?sensor_id=${sensorId}&rollup=1d&from=${fromDate}&to=${toDate}`
            promises.push(axios.get(url));
            fromDate.subtract(1, "days");
            toDate.subtract(1, "days");
        }

        var sumReadings = 0;
        var total = 0;
        Promise.all(promises).then((responses) => {
            responses.forEach(element => {
                if (element.data.readings.length > 0) {
                    sumReadings += element.data.readings[0][1];
                    total += 1;
                }
            });
            const avgReadings = sumReadings / total;
           return resolve({"sensorId": sensorId, "avg": avgReadings});
       }).catch(() => {
           return resolve({"sensorId": sensorId, "avg": null});
       });
    });
}



module.exports = {
    getCourts,
    getAvailableTimes,
    getDisponibility,
    book,
    getBookings,
    cancelBooking,
}