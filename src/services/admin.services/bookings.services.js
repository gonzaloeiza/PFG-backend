const databaseSevice = require("./database.services");

function getBookings() {
    return new Promise((resolve, reject) => {
        return resolve("llñlllodokf");
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