const databaseSevice = require("./database.services");

function updateCourtData(courtId, courtData) {
    return new Promise((resolve, reject) => {
        databaseSevice.updateCourtData(courtId, courtData).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function deleteCourt(courtId) {
    return new Promise((resolve, reject) => {
        databaseSevice.deleteCourt(courtId).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

module.exports = {
    updateCourtData,
    deleteCourt,
}