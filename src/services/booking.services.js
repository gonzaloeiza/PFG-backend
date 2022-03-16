const databaseService = require("./database.services");

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
                var starts = new Date(`${bookingDay}T${courtData.opensAt}.000Z`);
                const finishes = new Date(`${bookingDay}T${courtData.closesAt}.000Z`);
                var currentTime = new Date();
                currentTime.setTime(currentTime.getTime() - new Date().getTimezoneOffset()*60*1000);
                var availableTimes = [];
                var i = 0;
                while (starts <= finishes) {
                    if (i < bookings.length) {
                        var d = new Date(`${bookings[i].day}T${bookings[i].time}.000Z`)
                        if (starts.getTime() === d.getTime()) {
                            i++;
                        } else {
                            if (starts.getTime() >= currentTime.getTime()) {
                                availableTimes.push(starts);
                            }
                        }
                    } else {
                        if (starts.getTime() >= currentTime.getTime()) {
                            availableTimes.push(starts);
                        }
                    }
                    starts = new Date(starts.getTime() + courtData.bookReservationTime * 60000); 
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

function book(userId, courtName, date, withLight) {
    return new Promise((resolve, reject) => {
        databaseService.getCourtData(courtName).then((courtData) => {
            databaseService.bookCourt(userId, courtData.id, date, withLight).then((data) => {
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