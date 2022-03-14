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
        res.status(400).send(err);
    });
}

module.exports = {
    validateSignup,
    validateLogin,
    validateDisponibility
}