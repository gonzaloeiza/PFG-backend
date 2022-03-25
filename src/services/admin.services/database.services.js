const models = require("../../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const moment = require('moment');

const databaseError = "Error, intentelo de nuevo más tarde";

function login(email, password) {
    return new Promise((resolve, reject) => {
        models.Admin.findOne({
            where: {
                email: email
            },
            attributes: ["id", "passwordHash"],
            raw: true
        }).then((data) => {
            if (data) {
                if (bcrypt.compareSync(password, data.passwordHash)) {
                    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
                        expiresIn: `${process.env.JWT_EXPIRESINSECONDS}s`
                    });
                    return resolve({
                        "accessToken": token,
                        "name": data.name,
                    });
                } else {
                    return reject("email/contraseña incorrecta.");
                }
            } else {
                return reject("email/contraseña incorrecta.");
            }         
        }).catch((err) => {
            console.log(err);
            return reject(databaseError);
        });
    });
}

module.exports = {
    login,
}