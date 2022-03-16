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


/**
 *  ------------------
 * @param {Object} 
 * @return {}
 */
function getCourtData(courtName) {
    return new Promise((resolve, reject) => {
        models.Court.findOne({
            where: {name: courtName},
            attributes: ["id", "opensAt", "closesAt", "bookReservationTime", "numberOfDaysToBookBefore"],
            raw: true
        }).then((data) => {
            if (data) {
                return resolve(data);
            } else {
                return reject(`No existe ninguna pista con el nombre: ${courtName}`);
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
function getCourtDisponibility(bookingDay, courtName) {
    return new Promise((resolve, reject) => {
        models.Booking.findAll({
            include: {
                model: models.Court,
                as: "court",
                required: true,
                where: {name: courtName},
                attributes: []
            },
            where: {day: bookingDay},
            attributes: ["day", "time"],
            order: [['time', 'ASC']],
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
function bookCourt(userId, courtId, date, withLight) {
    const day = `${date.getFullYear()}-${("0" + date.getMonth()).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
    const time = `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
    return new Promise((resolve, reject) => {
        models.Booking.create({
            day: day,
            time: time,
            withLight: withLight,
            userId: userId,
            courtId: courtId
        }).then((data) => {
            return resolve(data);
        }).catch((err) => {
            console.log(err);
            return reject(err);
        });
    });
}

module.exports = {
    emailExists,
    signIn,
    signUp,
    getCourts,
    courtNameExists,
    getCourtData,
    getCourtDisponibility,
    bookCourt,
}