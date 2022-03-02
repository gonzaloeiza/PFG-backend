const {authService} = require("../services");
const bcrypt = require("bcryptjs");

function signIn(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    authService.signIn(username, password)
    .then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(400).send(err);
    });
}


function signUp(req, res, next) {
    const userData = {
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 8),
        username: req.body.username,
        name: req.body.name,
        firstSurname: req.body.firstSurname,
        secondSurname: req.body.secondSurname,
        phoneNumber: req.body.phoneNumber,
        dateBirth: req.body.dateBirth,
        gender: req.body.gender,
        sidePlaying: req.body.sidePlaying,
        direction: req.body.direction,
        poblation: req.body.poblation,
        postalCode: req.body.postalCode,
        province: req.body.province
    };
    authService.signUp(userData)
    .then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

module.exports =  {
    signIn,
    signUp
}