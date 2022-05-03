const {userService} = require("../services"); 
const bcrypt = require("bcryptjs");

function getUserProfile(req, res, next) {
    const userId = req.userId;
    userService.getProfile(userId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function submitContactForm(req, res, next) {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const message = req.body.message;

    userService.submitContactForm(name, surname, email, message).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function updateProfile(req, res, next) {
    var userData = {};
    const userId = req.userId;
    userData.dni = req.body.dni;
    userData.phoneNumber = req.body.phoneNumber;
    userData.name = req.body.name;
    userData.firstSurname = req.body.firstSurname;
    userData.secondSurname = req.body.secondSurname;
    userData.dateBirth = req.body.dateBirth;
    userData.gender = req.body.gender;
    userData.direction = req.body.direction;
    userData.poblation = req.body.poblation;
    userData.postalCode = req.body.postalCode;
    userData.province = req.body.province;
    
    if (req.body.newPassword !== undefined && req.body.newPassword !== null && req.body.newPassword !== "") {
        userData.passwordHash = bcrypt.hashSync(req.body.newPassword, 8);
    }
    
    userService.updateProfile(userId, userData).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}


function deleteAccount(req, res, next) {
    const userId = req.userId;
    
    userService.deleteAccount(userId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function restorePassword(req, res, next) {
    const email = req.body.email;
    userService.restorePassword(email).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports = {
    getUserProfile,
    submitContactForm,
    updateProfile,
    deleteAccount,
    restorePassword,
}