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
            order: [["updatedAt", "DESC"]],
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


/**
 * this function gets all the courts and their information that are stored in the databases
 * @return {Array} returns an array ob court objects
 */
function getCourts() {
    return new Promise((resolve, reject) => {
        models.Court.findAll({
            attributes: {exclude: ["createdAt"]},
            raw:true
        }).then((data) => {
            return resolve(data);     
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


/**
 * 
 * @return {} 
 */
function getBookings(fromDay, toDay) {
    return new Promise((resolve, reject) => {
        models.Booking.findAll({
            include: [
                {
                    model: models.Court,
                    as: "court",
                    required: true
                }, {
                    model: models.User,
                    as: "user",
                    required: true
                },
            ],
            where: {
                [Op.and]: [
                    {day: {
                        [Op.gte]: fromDay
                    }},
                    {day: {
                        [Op.lte]: toDay
                    }},
                ],
            },
            order: [['day', 'desc'], ['startTime', 'desc']],
            raw: true
        }).then((bookings) => {
            return resolve(bookings);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

/**
 * 
 * @return {} 
 */
function updateBookingIsPaid(bookingId, isPaid) {
    return new Promise((resolve, reject) => {
        models.Booking.update({
            paid: isPaid
        }, {
          where: {id: bookingId},
          raw: true
        }).then((data) => {
            if (data[0] > 0) {
                return resolve("Se ha actualizado el campo pagado de la reserva");
            } else {
                return reject(databaseError);
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

/**
 * 
 * @return {} 
 */
function deleteBooking(bookingId) {
    return new Promise((resolve, reject) => {
        models.Booking.destroy({
            where: {id: bookingId}
        }).then((data) => {
            if (data === 1) {
                return resolve("Se ha anulado la pista con éxito");
            } else {
                return reject(databaseError);
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

/**
 * 
 * @return {} 
 */
function getAllUsers() {
    return new Promise((resolve, reject) => {
        models.User.findAll({
            attributes: {exclude: ["passwordHash", "createdAt"]},
            order: [["name", "DESC"], ["firstSurname", "DESC"], ["secondSurname", "DESC"]],
            raw: true
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

/**
 * 
 * @return {} 
 */
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        models.User.findOne({
            where: {id: userId},
            raw: true,
            attributes: {exclude: ["passwordHash", "createdAt", "updatedAt"]}
        }).then((data) => {
            if (data) {
                return resolve(data);
            } else {
                return reject(databaseError);
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

/**
 * 
 * @return {} 
 */
function getUserBookings(userId) {
    return new Promise((resolve, reject) => {
        models.Booking.findAll({
            include: [
                {
                    model: models.Court,
                    as: "court",
                    required: true,
                    attributes:{exclude: ["opensAt", "closesAt", "numberOfDaysToBookBefore", "numberOfHoursToCancelCourt", "createdAt", "updatedAt"]}
                }, {
                    model: models.User,
                    as: "user",
                    required: true,
                    attributes:[],
                    where: {id: userId}
                },    
            ],
            attributes: {exclude: ["userId", "courtId", "createdAt", "updatedAt"]},
            order: [['day', 'desc'], ['startTime', 'desc']],
            raw: true,
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

/**
 * 
 * @return {} 
 */
function updateUserProfile(userId, userData) {
    return new Promise((resolve, reject) => {
        models.User.update(userData,
            {
                where: {id: userId}
            }).then(() => {
                return resolve("Se ha actualizado el perfil correctamente");
            }).catch(() => {
                return reject(databaseError);
            });
        });
}


/**
 * 
 * @return {} 
 */
function deleteUser(userId) {
    return new Promise((resolve, reject) => {
        models.User.destroy({
            where: {id: userId}
        }).then((data) => {
            if (data === 1) {
                return resolve("Se ha eliminado al usuario correctamente");
            } else {
                return reject(databaseError);
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

/**
 * 
 * @return {} 
 */
function updateCourtData(courtId, courtData) {
    return new Promise((resolve, reject) => {
        models.Court.update(courtData,
            {
                where: {id: courtId}
            }).then(() => {
                return resolve("Se ha actualizado la información de la pista correctamente");
            }).catch(() => {
                return reject(databaseError);
            });
    });
}

/**
 * 
 * @return {} 
 */
 function deleteCourt(courtId) {
    return new Promise((resolve, reject) => {
        models.Court.destroy({
            where: {id: courtId}
        }).then((data) => {
            if (data === 1) {
                return resolve("Se ha eliminado la pista correctamente");
            } else {
                return reject(databaseError);
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


/**
 * 
 * @return {} 
 */
function createCourt(courtData) {
    return new Promise((resolve, reject) => {
        models.Court.create(courtData)
        .then((data) => {
            return resolve("Se ha creado la pista correctamente");
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


/**
 * 
 * @return {} 
 */
 function updateAdminPassword(adminId, newPassword) {
    return new Promise((resolve, reject) => {
        models.Admin.update(
            {
                passwordHash: newPassword
            },
            {
                where: {id: adminId}
            }).then(() => {
                return resolve("La contraseña se ha cambiado correctamente");
            }).catch(() => {
                return reject(databaseError);
            });
    });
 }

 function adminExists(adminId) {
    return new Promise((resolve, reject) => {
        models.Admin.findOne({
            where: {id: adminId},
            attributes: ["email"],
            raw: true
        }).then((data) => {
            if (data) {
                return resolve();
            } else {
                return reject();
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
 }


function updateCourtPicture(courtName, courtData) {
    return new Promise((resolve, reject) => {
        models.Court.update(courtData,
            {
                where: {name: courtName}
            }).then(() => {
                return resolve("Se ha actualizado la imagen de la pista correctamente");
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
    getCourts,
    getBookings,
    updateBookingIsPaid,
    deleteBooking,
    getAllUsers,
    getUserData,
    getUserBookings,
    updateUserProfile,
    deleteUser,
    updateCourtData,
    deleteCourt,
    createCourt,
    updateAdminPassword,
    adminExists,
    updateCourtPicture,
}