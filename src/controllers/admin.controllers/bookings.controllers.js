const { bookingsService } = require("../../services").adminService;

function getBookings(req, res, next) {
    const fromDay = req.body.fromDay;
    const toDay = req.body.toDay;
    const courtName = req.body.courtName;
    const onlyActiveBookings = req.body.onlyActiveBookings;
    const paidBookings = req.body.paidBookings;
    bookingsService.getBookings(fromDay, toDay, courtName, onlyActiveBookings, paidBookings).then((data) => {
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