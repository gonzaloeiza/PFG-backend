const userService = require("./user.services");
const authService = require("./auth.services");
const databaseService = require("./database.services");
const emailService = require("./email.service");
const validationService = require("./validation.services");

module.exports = {
    userService,
    authService,
    databaseService,
    emailService,
    validationService
}