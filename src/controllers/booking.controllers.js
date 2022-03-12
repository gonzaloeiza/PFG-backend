const { bookingService } = require("../services")

function getCourts(req, res, next) {
    res.send(bookingService.getCourts());
}


module.exports = {
    getCourts,
}