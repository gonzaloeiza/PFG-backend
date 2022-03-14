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
        }).catch(() => {
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
        }).catch(() => {
            return reject(databaseError);
        });
    });   
}

/**
 *  ------------------
 * @param {Object} 
 * @return {}
 */
function getCourts() {
    return new Promise((resolve, reject) => {
        models.Court.findAll({
            attributes: {exclude: ["createdAt", "updatedAt"]},
            raw: true
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


/**
 *  ------------------
 * @param {Object} 
 * @return {}
 */
function courtNameExists(courtName) {
    return new Promise((resolve, reject) => {
        models.Court.findOne({
            where: {name: courtName},
            attributes: ["id"],
            raw:true
        }).then((data) => {
            if (data) {
                return resolve();
            } else {
                return reject(`No existe ninguna pista con el nombre: ${courtName}`);
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


module.exports = {
    emailExists,
    signIn,
    signUp,
    getCourts,
    courtNameExists,
}