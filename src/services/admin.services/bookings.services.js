const databaseSevice = require("./database.services");
const moment = require('moment');

function getBookings(fromDay, toDay, courtName, onlyActiveBookings, paidBookings) {
    return new Promise((resolve, reject) => {
        var allCourts = false;
        var onlyActive = false;
        var paid = null;
        console.log(courtName);
        if (courtName === "Todas") {
            allCourts = true;
        }

        if (onlyActiveBookings == "true") {
            onlyActive = true;
        }

        if (paidBookings == "true") {
            paid = true;
        } else if (paidBookings == "false") {
            paid = false;
        }

        if (paid === null) {
            //obtain paid and not paid

        } else {
            if (onlyActive) {
                // getActiveBookings
            } else {
                // getAllBookings
            }
        }

        databaseSevice.getBookings(fromDay, toDay).then((bookings) => {
            if (paid !== null) {
                bookings = bookings.filter((booking) => {
                    console.log(booking.paid);
                    if (booking.paid === paid) {
                        return booking;
                    }
                });
            }

            if (onlyActive === true) {
                const now = moment();
                bookings = bookings.filter((booking) => {
                    const bookingDate = moment(booking.day + " " + booking.startTime, "YYYY-MM-DD HH:mm:ss");
                    if (bookingDate >= now) {
                        return booking;
                    }
                })
            }

            if (allCourts === false) {
                bookings = bookings.filter((booking) => {
                    if (booking["court.name"] === courtName) {
                        return booking;
                    }
                });
            }

            return resolve(bookings);
        }).catch((err) => {
            console.log(err);
            return reject(err);
        });
    });
}

function getCourts() {
    return new Promise((resolve, reject) => {
        databaseSevice.getCourts().then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

module.exports = {
    getBookings,
    getCourts,
}