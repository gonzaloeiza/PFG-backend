const models = require("../../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const moment = require('moment');

const databaseError = "Error, intentelo de nuevo más tarde";

/**
 *  This function checks if the user's email and password matches and returns an access-token if so (signin correct).
 * @param {String} email, user's email
 * @param {String} password, user's password
 * @return {Object} returns an object with the access token and the user's name
 */
function signin(email, password) {
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

/**
 *  this function gets all the users that are pending to be accepted
 * @return {Array} returns an array of object with all the users that have to be accepted
 */
function getPendingUsers() {
    return new Promise((resolve, reject) => {
        models.User.findAll({
            where: {pendingSignUp: true},
            attributes: {exclude: ["passwordHash", "createdAt", "pendingSignUp"]},
            raw: true
        }).then((users) => {
            return resolve(users);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


/**
 *  this function sets the pendingSignUp column from a user to 0, given the userId
 * @param {Number} userId the user's primary key
 * @return {String} returns a string, that says register request accepted or error in database
 */
function acceptUser(userId) {
    return new Promise((resolve, reject) => {
        models.User.update({
            pendingSignUp: 0
        }, {
            where: {id: userId}
        }).then((data) => {
            if (data[0] > 0) {
                return resolve("Se ha aceptado la solicitud de registro con éxito");
            } else {
                return reject(databaseError);
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


/**
 *  this function deletes user that is in pending signup (rejects registracion request)
 * @param {Number} userId the user's primary key
 * @return {String} returns a string that says if user has been deleted or not
 */
function rejectUser(userId) {
    return new Promise((resolve, reject) => {
        models.User.destroy({
            where: {id: userId}
        }).then((data) => {
            if (data === 1) {
                return resolve("Se ha rechazado la solicitud de registro con éxito");
            } else {
                return reject(databaseError);
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

module.exports = {
    signin,
    getPendingUsers,
    acceptUser,
    rejectUser,
}