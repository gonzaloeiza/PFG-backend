const databaseService = require("./database.services");
const { APISmartCitizenDeviceURL, smartCitizenDevicePageURL } = require("../config");
const  axios = require("axios");

function getCourtData(courtId) {
    return new Promise((resolve, reject) => {
        databaseService.getCourtDataById(courtId).then((data) => {
            const smartCitizenId = data.smartCitizenId;
            if (smartCitizenId != "") {
                const url = `${APISmartCitizenDeviceURL}/${smartCitizenId}`;
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
                    data.last_reading_at = response.data.last_reading_at;
                    data.smartCitizenURL = `${smartCitizenDevicePageURL}/${smartCitizenId}`
                    data.sensors = sensors;
                    return resolve(data);
                }).catch(() => {
                    data.last_reading_at = null;
                    data.sensors = null;
                    return resolve(data);
                });
            }
            }).catch((err) => {
                return reject(err);
            });
        });
}

module.exports = {
    getCourtData
}