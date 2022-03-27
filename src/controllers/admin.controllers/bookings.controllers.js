const { bookingsService } = require("../../services").adminService;

function getBookings(req, res, next) {
    bookingsService.getBookings().then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function getCourts(req, res, next) {
    bookingsService.getCourts().then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports = {
    getBookings,
    getCourts,
} 