const databaseService = require("./database.services");
const { APISmartCitizenDeviceURL, smartCitizenDevicePageURL } = require("../../config");
const axios = require("axios");

function getCourtsData() {
    return new Promise((resolve, reject) => {
        databaseService.getCourts().then((courts) => {
            var pendingPromises = [];
            courts.forEach(court => {
                pendingPromises.push(fetchSmartCitizenDeviceData(court));
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


function fetchSmartCitizenDeviceData(court) {
    return new Promise((resolve, reject) => {
        const url = `${APISmartCitizenDeviceURL}/${court.smartCitizenId}`;
        if (url.trim() !== "") {
            axios.get(url).then((response) => {
                var sensors = response.data.data.sensors;
                sensors = sensors.reduce((newList, sensor) => {
                    if (sensor.value !== null && sensor.name !== "Battery SCK" && sensor.name !== "AMS CCS811 - TVOC") {
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
                court.last_reading_at = null;
                court.sensors = null;
                return resolve(court);
            });
        } else {
            court.last_reading_at = null;
            court.sensors = null;
            return resolve(court);
        }
    });
}

function updateCourtData(courtId, courtData) {
    return new Promise((resolve, reject) => {
        databaseService.updateCourtData(courtId, courtData).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function deleteCourt(courtId) {
    return new Promise((resolve, reject) => {
        databaseService.deleteCourt(courtId).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function createNewCourt(courtData) {
    return new Promise((resolve, reject) => {
        databaseService.createCourt(courtData).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function updateCourtPicture(courtName, courtData) {
    return new Promise((resolve, reject) => {
        databaseService.updateCourtPicture(courtName, courtData).then((data) => {
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