const { bookingService } = require("../services")

function getCourts(req, res, next) {
    bookingService.getCourts().then((data) => {
        res.status(200).send({message: data});
    }).catch((err) => {
        res.status(400).send({message: err});
    });
}

function getDisponibility(req, res, next) {
    bookingService.getDisponibility().then((data) => {
        res.status(200).send({message: data});
    }).catch((err) => {
        res.status(400).send({message: err});
    });
}

module.exports = {
    getCourts,
    getDisponibility,
}