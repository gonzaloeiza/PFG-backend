const databaseService = require("./database.services");
const moment = require('moment');
const emailService = require("./email.services");

function getCourts() {
    return new Promise((resolve, reject) => {
        databaseService.getCourts().then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        }); 
    });
}

function getDisponibility(bookingDay, courtName) {
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


module.exports = {
    getCourts,
    getDisponibility,
    book,
    getBookings,
    cancelBooking,
}