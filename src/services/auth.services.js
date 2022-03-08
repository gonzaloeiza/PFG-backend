const models = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {jwtSecret} = require("../config");

function signIn(email, password) {
    return new Promise((resolve, reject) => {
        models.User.findOne({
            where: {
                email: email
            },
            attributes: ["id", "name", "passwordHash"],
            raw: true
        }).then((data) => {
            if (data) {
                if (bcrypt.compareSync(password, data.passwordHash)) {
                    const token = jwt.sign({ id: data.id }, jwtSecret, {
                        expiresIn: 86400 // 24 hours
                    });
                    resolve({
                        "accessToken": token,
                        "name": data.name,
                    });
                } else {
                    reject("email/contraseña incorrecta.");
                }
            } else {
                reject("email/contraseña incorrecta.");
            }         
        }).catch((err) => {
            reject("Ha ocurrido un error, intentar de nuevo mas tarde.");
        });
    });
}


function signUp(userData) {
    return new Promise((resolve, reject) => {
        models.User.create(userData)
        .then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    signIn,
    signUp
}