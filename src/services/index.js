const userService = require("./user.services");
const authService = require("./auth.services");
const databaseService = require("./database.services");
const emailService = require("./email.service");
const validationService = require("./validation.services");
const bookingService = require("./booking.services");
const adminService = require("./admin.services");

module.exports = {
    userService,
    authService,
    databaseService,
    emailService,
    validationService,
    bookingService,
    adminService,
}