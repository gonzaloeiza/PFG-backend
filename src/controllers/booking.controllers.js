const { bookingService } = require("../services")

function getCourts(req, res, next) {
    bookingService.getCourts().then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function getDisponibility(req, res, next) {
    const bookingDay = req.body.bookingDay;
    const courtName = req.body.courtName;
    bookingService.getDisponibility(bookingDay, courtName).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function book(req, res, next) {
    const userId = req.userId;
    const courtName = req.body.courtName;
    const date = req.body.bookingDate;
    const withLight = req.body.withLight;
    bookingService.book(userId, courtName, date, withLight).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function getBookings(req, res, next) {
    const userId = req.userId;
    const fromDay = req.body.fromDay;
    const toDay = req.body.toDay;
    const onlyActiveBookings = req.body.onlyActiveBookings;
    bookingService.getBookings(userId, fromDay, toDay, onlyActiveBookings).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });

}

module.exports = {
    getCourts,
    getDisponibility,
    book,
    getBookings,
}