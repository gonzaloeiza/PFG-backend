const userController = require("./user.controllers");
const authController = require("./auth.controllers");
const bookingController = require("./booking.controllers");
const courtsController = require("./courts.controllers");
const rankingsController = require("./rankings.controllers");
const adminController = require("./admin.controllers");


module.exports = {
    userController,
    authController,
    bookingController,
    courtsController,
    rankingsController,
    adminController,
}