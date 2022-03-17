const databaseService = require("./database.services");
const moment = require('moment');

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
                        if (starts.format("HH:mm:ss") === bookings[i].time) {
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
            databaseService.bookCourt(userId, courtData.id, date, light, amountToPay).then((data) => {
                return resolve(data);
            }).catch((err) => {
                return reject(err);
            });    
        }).catch((err) => {
            return reject(err);
        });
    });
}

module.exports = {
    getCourts,
    getDisponibility,
    book,
}