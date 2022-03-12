const models = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const databaseError = "Error, intentelo de nuevo más tarde";

/**
 *  ------------------
 * @param {String} email 
 * @return {Boolean}
 */
function emailExists(email) {
    return new Promise((resolve, reject) => {
        models.User.findOne({
            where: {email: email},
            attributes: ["id"],
            raw: true
        }).then((data) => {
            if (data) {
                return reject("Ya existe un usuario con ese correo electrónico");
            } else {
                return resolve();
            }
        }).catch(() => {
            return reject(databaseError);
        });
        });
}


/**
 *  ------------------
 * @param {String} 
 * @param {String} 
 * @return {}
 */
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
                    console.log(data);
                    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
                        expiresIn: `${process.env.JWT_EXPIRESINSECONDS}s`
                    });
                    console.log(token);
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
            return reject(databaseError);
        });
    });
}


/**
 *  ------------------
 * @param {Object} 
 * @return {}
 */
function signUp(userData) {
    return new Promise((resolve, reject) => {
        models.User.create(userData)
        .then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(databaseError);
        });
    });   
}

module.exports = {
    emailExists,
    signIn,
    signUp

}