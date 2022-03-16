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
    var date = new Date(req.body.bookingDate);
    date.setTime(date.getTime() + new Date().getTimezoneOffset()*60*1000);
    const withLight = Boolean(req.body.withLight);
    bookingService.book(userId, courtName, date, withLight).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports = {
    getCourts,
    getDisponibility,
    book,
}