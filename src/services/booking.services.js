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

function getDisponibility() {
    return new Promise((resolve, reject) => {
        resolve("servicio disponibility");
    });
}


module.exports = {
    getCourts,
    getDisponibility,
}

