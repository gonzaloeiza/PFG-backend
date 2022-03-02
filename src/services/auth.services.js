const models = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {jwtSecret} = require("../config");

function signIn(username, password) {
    return new Promise((resolve, reject) => {
        models.User.findOne({
            where: {
                username: username
            },
            attributes: ["id", "passwordHash"],
            raw: true
        }).then((data) => {
            if (data) {
                if (bcrypt.compareSync(password, data.passwordHash)) {
                    const token = jwt.sign({ id: data.id }, jwtSecret, {
                        expiresIn: 86400 // 24 hours
                    });

                    resolve(
                        {"accessToken": token}
                    );
                } else {
                    reject("Incorrect username/password.");
                }
            } else {
                reject("Incorrect username/password.");
            }         
        }).catch((err) => {
            reject(err);
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