const models = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const moment = require('moment');

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
                email: email,
                pendingSignup: false
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
            attributes: {exclude: ["createdAt"]},
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
            attributes: ["day", "startTime"],
            order: [['startTime', 'ASC']],
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
function bookCourt(userId, courtId, courtBookReservationTime, date, withLight, amountToPay) {
    return new Promise((resolve, reject) => {
        models.Booking.create({
            day: date.format("YYYY-MM-DD"),
            startTime: date.format("HH:mm"),
            finishTime: date.clone().add(courtBookReservationTime, "m").format("HH:mm"),
            withLight: withLight,
            amountToPay: amountToPay,
            userId: userId,
            courtId: courtId
        }).then((data) => {
            if (data) {
                return resolve("Reserva realizada con éxito");
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
function getActiveBookings(userId, fromDay, toDay) {
    return new Promise((resolve, reject) => {
        models.Booking.findAll({
            include: {
                model: models.Court,
                as: "court",
                attributes: ["name", "numberOfHoursToCancelCourt"]
            },
            where: {
                [Op.and]: [
                    {userId: userId},
                    {day: {
                        [Op.gte]: fromDay
                    }},
                    {day: {
                        [Op.lte]: toDay
                    }},
                    {day: {
                        [Op.gte]: moment().format("YYYY-MM-DD")
                    }}
                ]
            },
            attributes: {exclude: ["courtId", "userId", "createdAt", "updatedAt"]},
            order: [['day', 'desc'], ['startTime', 'desc']],
            raw: true
        }).then((data) => {
            return resolve(data);
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
 function getAllBookings(userId, fromDay, toDay) {
    return new Promise((resolve, reject) => {
        models.Booking.findAll({
            include: {
                model: models.Court,
                as: "court",
                attributes: ["name", "numberOfHoursToCancelCourt"]
            },
            where: {
                [Op.and]: [
                    {userId: userId},
                    {day: {
                        [Op.gte]: fromDay
                    }},
                    {day: {
                        [Op.lte]: toDay
                    }},
                ]
            },
            attributes: {exclude: ["courtId", "userId", "createdAt", "updatedAt"]},
            order: [['day', 'desc'], ['startTime', 'desc']],
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
function getBookingData(userId, bookingId) {
    return new Promise((resolve, reject) => {
        models.Booking.findOne({
            include: {
                model: models.Court,
                as: "court",
                required: true,
                attributes: ["numberOfHoursToCancelCourt"]
            },
            where: [
                {id: bookingId},
                {userId: userId}
            ],
            attributes: ["day", "startTime"],
            raw: true
        }).then((data) => {
            if (data) {
                return resolve(data);
            } else {
                return reject("No existen reservas con ese id para este usuario");
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
function cancelBooking(userId, bookingId) {
    return new Promise((resolve, reject) => {
        models.Booking.destroy({
            where: [
                {userId: userId},
                {id: bookingId}
            ]
        }).then(() => {
            return resolve("Reserva cancelada con éxito");
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function userExists(userId) {
    return new Promise((resolve, reject) => {
        models.User.findOne({
            where: {id: userId},
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

function courtExists(courtId) {
    return new Promise((resolve, reject) => {
        models.Court.findOne({
            where: {id: courtId},
            attributes: ["id"],
            raw:true
        }).then((data) => {
            if (data) {
                return resolve();
            } else {
                return reject(`No existe la pista con id ${courtId}`);
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function getCourtDataById(courtId) {
    return new Promise((resolve, reject) => {
        models.Court.findOne({
            where: {id: courtId},
            raw: true,
            attributes: {exclude: ["createdAt"]}
        }).then((data) => {
            if (data) {
                return resolve(data);
            } else {
                return reject(`No existe la pista con id ${courtId}`);
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function addContactForm(name, surname, email, message) {
    return new Promise((resolve, reject) => {
        models.ContactForm.create({
            name: name,
            surname: surname,
            email: email,
            message: message
        }).then(() => {
            return resolve("Formulario enviado correctamente");
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function getUserData(userId) {
    return new Promise((resolve, reject) => {
        models.User.findOne({
            where: {id: userId},
            attributes: {exclude: ["passwordHash", "pendingSignUp", "createdAt"]},
            raw: true
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

function updateUserProfile(userId, userData) {
    return new Promise((resolve, reject) => {
        models.User.update(userData, {
            where: {id: userId}
        }).then(() => {
            return resolve("Se ha actualizado el perfil correctamente");
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


function userDoesNotHavePendingBookingsToPay(userId) {
    return new Promise((resolve, reject) => {
        models.Booking.findOne({
            include: {
                model: models.User,
                as: "user",
                required: true,
                where: {id: userId},
                attributes: []
            },
            where: {paid: false},
            attributes: ["id"],
            raw: true
        }).then((data) => {
            if (data) {
                return reject("No puedes borrar tu cuenta porque tienes reservas pendientes por pagar");
            } else {
                return resolve();
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function deleteUserAccount(userId) {
    return new Promise((resolve, reject) => {
        models.User.destroy({
            where: {id: userId}
        }).then(() => {
            return resolve("La cuenta se ha eliminado con éxito");
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function getRankingsOfUser(userId) {
    return new Promise((resolve, reject) => {
        models.Partner.findAll({
            where: {
                [Op.or] : [
                    {playerOneId: userId},
                    {playerTwoId: userId}
                ]
            },
            include: [
                {
                    model: models.Ranking,
                    as: "ranking",
                    required: true,
                    where: {registrationOpen: 0},
                    attributes: {exclude: ["id", "registrationOpen", "createdAt", "updatedAt"]}
                },
                {
                    model: models.User,
                    as: "playerOne",
                    required: true,
                    attributes: []
                },{
                    model: models.User,
                    as: "playerTwo",
                    required: true,
                    attributes: []
                }
            ],
            attributes: {exclude: ["playerOneId", "playerTwoId", "createdAt", "updatedAt"]},
            raw: true
        }).then((data) => {
            if (data.length > 0) {
                return resolve(data);
            } else {
                return reject("No estas inscrito en ningún ranking");
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function isUserInscribedOnRanking(rankingId, userId) {
    return new Promise((resolve, reject) => {
        models.Partner.findOne({
            where: {
                [Op.and] : [
                    {rankingId: rankingId},
                    {
                        [Op.or] : [
                            {playerOneId: userId},
                            {playerTwoId: userId}
                        ]
                    }
                ]
            },
            attributes: {exclude: ["createdAt", "updatedAt"]},
            raw: true,
        }).then((data) => {
            if (data) {
                return resolve(data);
            } else {
                return reject("No estas inscrito en este ranking");
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


function getDataOfSpecificRanking(rankingId, partnerId) {
    return new Promise((resolve, reject) => {
        models.Match.findAll({
            where: {
                [Op.or]: [
                    {partnerOneId: partnerId},
                    {partnerTwoId: partnerId}
                ]
            },
            include: [
                {
                    model: models.Group,
                    as: "group",
                    required: true,
                    attributes: ["id", "number"],
                    where: {rankingId: rankingId},
                    include: {
                        model: models.Ranking,
                        as: "ranking",
                        required: true,
                        attributes: ["name", "description", "createdAt"]
                    }
                },
                {
                    model: models.Partner,
                    as: "partnerOne",
                    required: true,
                    attributes: ["id"],
                    include: [
                        {
                          model: models.User,
                          as: "playerOne",
                          required: true,
                          attributes: ["id", "email", "name", "firstSurname"]  
                        },
                        {
                        model: models.User,
                          as: "playerTwo",
                          required: true,
                          attributes: ["id", "email", "name", "firstSurname"] 
                        }
                    ]
                },
                {
                    model: models.Partner,
                    as: "partnerTwo",
                    required: true,
                    attributes: ["id"],
                    include: [
                        {
                          model: models.User,
                          as: "playerOne",
                          required: true,
                          attributes: ["id", "email", "name", "firstSurname"]  
                        },
                        {
                        model: models.User,
                          as: "playerTwo",
                          required: true,
                          attributes: ["id", "email", "name", "firstSurname"] 
                        }
                    ]
                }
            ],
            attributes: {exclude: ["groupId", "partnerOneId", "partnerTwoId", "createdAt", "updatedAt"]},
            raw: true
        }).then((data) => {
            return resolve(data);
        }).catch((err) => {
            console.log(err);
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
    getCourtData,
    getCourtDisponibility,
    bookCourt,
    getActiveBookings,
    getAllBookings,
    getBookingData,
    cancelBooking,
    userExists,
    courtExists,
    getCourtDataById,
    addContactForm,
    getUserData,
    updateUserProfile,
    userDoesNotHavePendingBookingsToPay,
    deleteUserAccount,
    getRankingsOfUser,
    getRankingsOfUser,
    isUserInscribedOnRanking,
    getDataOfSpecificRanking,
}