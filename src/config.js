const genderOptions = ["HOMBRE", "MUJER", "OTRO"];
const sidePlayingOptions = ["DERECHA", "REVES", "INDIFERENTE"];
const rankingTypes = ["MASCULINO", "FEMENINO", "MIXTO"];


const APISmartCitizenDeviceURL = "https://api.smartcitizen.me/v0/devices";
const smartCitizenDevicePageURL = "https://smartcitizen.me/kits"


const desiredCourtTemperature = 20;
const desiredCourtHumidity = 60;

const temperatureSensorId = 55;
const humiditySensorId = 56;

const sensorsIds = [temperatureSensorId, humiditySensorId];

module.exports =  {
    genderOptions,
    sidePlayingOptions,
    rankingTypes,
    APISmartCitizenDeviceURL,
    smartCitizenDevicePageURL,
    desiredCourtTemperature,
    desiredCourtHumidity,
    temperatureSensorId,
    humiditySensorId,
    sensorsIds,
}