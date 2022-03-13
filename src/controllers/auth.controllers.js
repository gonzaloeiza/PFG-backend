const {authService} = require("../services");
const bcrypt = require("bcryptjs");

function signIn(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    authService.signIn(email, password)
    .then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}


function signUp(req, res, next) {
    const userData = {
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 8),
        dni: req.body.dni,
        name: req.body.name,
        firstSurname: req.body.firstSurname,
        secondSurname: req.body.secondSurname,
        phoneNumber: req.body.phoneNumber,
        dateBirth: req.body.dateBirth,
        gender: req.body.gender,
        direction: req.body.direction,
        poblation: req.body.poblation,
        postalCode: req.body.postalCode,
        province: req.body.province
    };
    authService.signUp(userData)
    .then((data) => {
        return res.status(200).send({message: "successfull signup"});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports =  {
    signIn,
    signUp
}