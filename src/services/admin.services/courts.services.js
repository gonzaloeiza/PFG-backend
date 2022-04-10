const databaseSevice = require("./database.services");
const { APISmartCitizenDeviceURL, smartCitizenDevicePageURL } = require("../../config");
const axios = require("axios");

function getCourtsData() {
    return new Promise((resolve, reject) => {
        databaseSevice.getCourts().then((courts) => {
            var pendingPromises = [];
            courts.forEach(court => {;
                if (court.smartCitizenId.trim() !== "") {
                    const url = `${APISmartCitizenDeviceURL}/${court.smartCitizenId}`;
                    pendingPromises.push(fetchSmartCitizenDeviceData(court, url));
                }
            });
            Promise.all(pendingPromises).then((courts) => {
                return resolve(courts);
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}


function fetchSmartCitizenDeviceData(court, url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
            var sensors = response.data.data.sensors;
            sensors = sensors.reduce((newList, sensor) => {
                if (sensor.value !== null && sensor.name !== "Battery SCK") {
                    newList.push({
                        name: sensor.name,
                        description: sensor.description,
                        unit: sensor.unit,
                        value: sensor.value,
                    });
                }
                return newList;
            }, []);
            court.last_reading_at = response.data.last_reading_at;
            court.smartCitizenURL = `${smartCitizenDevicePageURL}/${court.smartCitizenId}`
            court.sensors = sensors;
            return resolve(court);
        }).catch((err) => {
            console.log(err);
            court.last_reading_at = null;
            court.sensors = null;
            return resolve(court);
        });
    });
}

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

function createNewCourt(courtData) {
    return new Promise((resolve, reject) => {
        databaseSevice.createCourt(courtData).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function updateCourtPicture(courtName, courtData) {
    return new Promise((resolve, reject) => {
        databaseSevice.updateCourtPicture(courtName, courtData).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}


module.exports = {
    getCourtsData,
    updateCourtData,
    deleteCourt,
    createNewCourt,
    updateCourtPicture,
}