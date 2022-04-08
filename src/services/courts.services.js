const databaseService = require("./database.services");
const { smartCitizenDeviceURL } = require("../config");


function getCourtData(courtId) {
    return new Promise((resolve, reject) => {
        databaseService.getCourtDataById(courtId).then((data) => {
            const smartCitizenId = data.smartCitizenId;
            const url = `${smartCitizenDeviceURL}/${smartCitizenId}`;
            console.log(url);
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

module.exports = {
    getCourtData
}