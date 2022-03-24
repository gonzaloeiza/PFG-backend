const { validationService } = require("../services");

function validateSignup(req, res, next) {
    const promises = [
        validationService.validateDNI(req.body.dni),
        validationService.validateName(req.body.name),
        validationService.validateFirstSurname(req.body.firstSurname),
        validationService.validateSecondSurname(req.body.secondSurname),
        validationService.validateBirthDate(req.body.dateBirth),
        validationService.validateGender(req.body.gender),
        validationService.validateEmail(req.body.email),
        validationService.validatePhoneNumber(req.body.phoneNumber),
        validationService.validatePassword(req.body.password),
        validationService.vaidateDirection(req.body.direction),
        validationService.validatePoblation(req.body.poblation),
        validationService.validatePostalCode(req.body.postalCode),
        validationService.validateProvince(req.body.province),
        validationService.validatePostalCode(req.body.postalCode)
    ]
    Promise.all(promises)
    .then(() => {
        return next();
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}


function validateLogin(req, res, next) {
    if (validationService.validateEmailRegex(req.body.email))  {
        return next();
    } else {
        return res.status(400).send({message: "Formato de email inválido"});
    }
}

function validateDisponibility(req, res, next) {
    const promises = [
        validationService.validateDisponibilityDate(req.body.bookingDay, req.body.courtName),
        validationService.validateCourtName(req.body.courtName)
    ]
    Promise.all(promises).then(() => {
        return next();
    }).catch((err) => {
        res.status(400).send({message: err});
    });
}


function validateBooking(req, res, next) {
    const promises = [
        validationService.validateCourtName(req.body.courtName),
        validationService.validateBookingDate(req.body.bookingDate, req.body.courtName),
        validationService.validateBooleanWithLight(req.body.withLight)
    ]

    Promise.all(promises).then(() => {
        return next();
    }).catch((err) => {
        res.status(400).send({message: err});
    });
}

function validateGetBookings(req, res, next) {
    const promises = [
        validationService.validateDateOnly(req.body.fromDay),
        validationService.validateDateOnly(req.body.toDay),        
        validationService.validateBooleanOnlyActiveBookings(req.body.onlyActiveBookings),
    ]

    Promise.all(promises).then(() => {
        return next();
    }).catch((err) => {
        console.log(err);
        res.status(400).send({message: err});
    });
}

function validateCancelation(req, res, next) {
    const promises = [
        validationService.validateBookingIdIsInteger(req.body.bookingId),
        validationService.validateBookingCancelation(req.userId, req.body.bookingId)
    ];

    Promise.all(promises).then(() => {
        return next();
    }).catch((err) => {
        console.log(err);
        res.status(400).send({message: err});
    });
}

module.exports = {
    validateSignup,
    validateLogin,
    validateDisponibility,
    validateBooking,
    validateGetBookings,
    validateCancelation,
}