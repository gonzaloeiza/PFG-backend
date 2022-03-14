const { bookingService } = require("../services")

function getCourts(req, res, next) {
    bookingService.getCourts().then((data) => {
        res.status(200).send({message: data});
    }).catch((err) => {
        res.status(400).send({message: err});
    });
}

function getDisponibility(req, res, next) {
    const bookingDay = req.body.bookingDay;
    const courtName = req.body.courtName;
    bookingService.getDisponibility(bookingDay, courtName).then((data) => {
        res.status(200).send({message: data});
    }).catch((err) => {
        res.status(400).send({message: err});
    });
}

module.exports = {
    getCourts,
    getDisponibility,
}