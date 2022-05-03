const models = require("../../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const moment = require('moment');
const sequelize = require("../../database/db");

const databaseError = "Error, intentelo de nuevo más tarde";

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


function createNewRanking(rankingData) {
    return new Promise((resolve, reject) => {
        models.Ranking.create(rankingData).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


function createNewGroup(rankingId, numberOfGroup) {
    return new Promise((resolve, reject) => {
        models.Group.create({
            rankingId: rankingId,
            number: numberOfGroup
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function partnerDoesNotExistsOnRanking(rankingId, playerOneId, playerTwoId) {
    return new Promise((resolve, reject) => {
        models.Partner.findOne({
            where: {
                [Op.and] : [
                    {rankingId: rankingId},
                    {
                        [Op.or]: [
                            {playerOneId: playerOneId},
                            {playerOneId: playerTwoId},
                            {playerTwoId: playerOneId},
                            {playerTwoId: playerTwoId},
                        ]
                    }
                ]
            },
            attributes: ["id"],
            raw: true
        }).then((data) => {
            if (data){
                return reject("Uno o los dos usuarios ya están registrados en este ranking");
            } else {
                return resolve();
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function createNewPartner(rankingId, playerOneId, playerTwoId) {
    return new Promise((resolve, reject) => {
        models.Partner.create({
            rankingId: rankingId,
            playerOneId: playerOneId,
            playerTwoId: playerTwoId
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function findLastGroupNumber(rankingId) {
    return new Promise((resolve, reject) => {
        models.Group.findAll({
            where: {rankingId: rankingId},
            attributes: [[sequelize.fn("max", sequelize.col("number")), 'maxGroup']],
            raw: true
        }).then((data) => {
            return resolve(data[0]);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


function getRankingGroupByNumber(rankingId, groupNumber) {
    return new Promise((resolve, reject) => {
        models.Group.findOne({
            where: [
                {rankingId: rankingId},
                {number: groupNumber}
            ],
            attributes: ["id", "number", "rankingId", "partnerOneId", "partnerTwoId", "partnerThreeId"],
            raw: true
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function updateFirstPartnerOfGroup(groupId, partnerId) {
    return new Promise((resolve, reject) => {
        models.Group.update({
            partnerOneId: partnerId
        }, {
            where: {id: groupId}
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}
function updateSecondPartnerOfGroup(groupId, partnerId) {
    return new Promise((resolve, reject) => {
        models.Group.update({
            partnerTwoId: partnerId
        }, {
            where: {id: groupId}
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}
function updateThirdPartnerOfGroup(groupId, partnerId) {
    return new Promise((resolve, reject) => {
        models.Group.update({
            partnerThreeId: partnerId
        }, {
            where: {id: groupId}
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function deleteGroup(groupId) {
    return new Promise((resolve, reject) => {
        models.Group.destroy({
            where: {id: groupId}
        }).then(() => {
            return resolve("Grupo eliminado con éxito");
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function deletePartners(partnersIds) {
    return new Promise((resolve, reject) => {
        models.Partner.destroy({
            where: {id: partnersIds}
        }).then(() => {
            return resolve("Parejas eliminadas con éxito");
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function getAllPartnersFromRanking(rankingId) {
    return new Promise((resolve, reject) => {
        models.Partner.findAll({
            where: {rankingId:rankingId},
            include: [
                {
                model: models.User,
                as: "playerOne",
                required: true,
                attributes: ["id","email",  "name", "firstSurname", "secondSurname", "rankingPoints"]
            },
            {
                model: models.User,
                as: "playerTwo",
                required: true,
                attributes: ["id","email", "name", "firstSurname", "secondSurname", "rankingPoints"]
            }
        ],
        attributes: ["id"],
        raw: true
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function updateFirstPartnerOfGroupByRankingIdAndNumberOfGroup(rankingId, numberOfGroup, partnerId){
    return new Promise((resolve, reject) => {
        models.Group.update({
            partnerOneId: partnerId
        }, {
            where: [
                {rankingId: rankingId},
                {number: numberOfGroup}
            ],
            raw: true
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function updateSecondPartnerOfGroupByRankingIdAndNumberOfGroup(rankingId, numberOfGroup, partnerId) {
    return new Promise((resolve, reject) => {
        models.Group.update({
            partnerTwoId: partnerId
        }, {
            where: [
                {rankingId: rankingId},
                {number: numberOfGroup}
            ],
            raw: true
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}
function updateThirdPartnerOfGroupByRankingIdAndNumberOfGroup(rankingId, numberOfGroup, partnerId) {
    return new Promise((resolve, reject) => {
        models.Group.update({
            partnerThreeId: partnerId
        }, {
            where: [
                {rankingId: rankingId},
                {number: numberOfGroup}
            ],
            raw: true
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    }); 
}

function getAllGroupsFromRanking(rankingId) {
    return new Promise((resolve, reject) => {
        models.Group.findAll({
            where: {rankingId: rankingId},
            attributes: ["id", "number", "partnerOneId", "partnerTwoId", "partnerThreeId"],
            order: [["number", "ASC"]],
            raw: true
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function createMatch(groupId, partnerOneId, partnerTwoId) {
    return new Promise((resolve, reject) => {
        models.Match.create({
            groupId: groupId,
            partnerOneId: partnerOneId,
            partnerTwoId: partnerTwoId
        }).then((data) => {
            return resolve(data);            
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function setRankingRegistrationClosed(rankingId) {
    return new Promise((resolve, reject) => {
        models.Ranking.update({
            registrationOpen: false,
            journeyNumber: 1
        }, 
        {
            where: {id: rankingId}
        }).then(() => {
            return resolve();
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function getAllRankings() {
    return new Promise((resolve, reject) => {
        models.Ranking.findAll({
            raw: true
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function getRankingData(rankingId) {
    return new Promise((resolve, reject) => {
        models.Ranking.findOne({
            where: {id: rankingId},
            raw: true
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function getMatchesFromRanking(rankingId) {
    return new Promise((resolve, reject) => {
        models.Match.findAll({
            attributes: {exclude: ["groupId", "partnerOneId", "partnerTwoId", "createdAt", "updatedAt"]},
            order: [["id", "ASC"]],
            raw: true,
            include: [
                {
                    model: models.Group,
                    as: "group",
                    required: true,
                    attributes: ["id", "number"],
                    where: {rankingId: rankingId},
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
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function deleteRanking(rankingId) {
    return new Promise((resolve, reject) => {
        models.Ranking.destroy({
            where: {id: rankingId}
        }).then(() => {
            resolve("Ranking borrado con éxito");
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function setNotPlayedMatchesToLost(matchId) {
    return new Promise((resolve, reject) => {
        models.Match.update({
            partnerOneWins: false
        }, {
            where: {id: matchId}
        }).then(() => {
            return resolve();
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function getResultOfMatchWhenPartnerOne(groupId, partnerId) {
    return new Promise((resolve, reject) => {
        models.Match.findOne({
            where:[
                {partnerOneId: partnerId},
                {groupId: groupId}
            ],
            attributes: ["id", "partnerOneWins"],
            raw: true
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function getResultOfMatchWhenPartnerTwo(groupId, partnerId) {
    return new Promise((resolve, reject) => {
        models.Match.findOne({
            where:[
                {partnerTwoId: partnerId},
                {groupId: groupId}
            ],
            attributes: ["id", "partnerOneWins"],
            raw: true
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function deleteMatch(matchId) {
    return new Promise((resolve, reject) => {
        models.Match.destroy({
            where: {id: matchId}
        }).then(() => {
            return resolve("Partido eliminado con éxito");
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function updateRankingJourney(rankingId, journeyNumber) {
    return new Promise((resolve, reject) => {
        models.Ranking.update({
            journeyNumber: journeyNumber
        }, {
            where: {id: rankingId}
        }
        ).then(() => {
            return resolve("Jornada de ranking incrementada con éxito");
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function getPartnerData(partnerId) {
    return new Promise((resolve, reject) => {
        models.Partner.findOne({
            where: {id: partnerId},
            include: [
                {
                    model: models.User,
                    as: "playerOne",
                    required: true
                }, {
                    model: models.User,
                    as: "playerTwo",
                    required: true
                }
            ],
            raw: true
        }).then((data) => {
            if (data) {
                return resolve(data);
            } else {
                return reject("No existe ninguna pareja con ese id");
            }
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


function updateUserPoints(userId, points) {
    return new Promise((resolve, reject) => {
        models.User.update({
            rankingPoints: points
        }, {
            where: {id: userId}
        }).then(() => {
            return resolve("Puntos del usuario del ranking actualizado con éxito");
        }).catch(() => {
            return reject(databaseError);
        });
    });
}


function getContactForms() {
    return new Promise((resolve, reject) => {
        models.ContactForm.findAll({
            attributes: {exclude: ["createdAt"]},
            order: [[['updatedAt', 'desc']]],
            raw: true,
        }).then((data) => {
            return resolve(data);
        }).catch(() => {
            return reject(databaseError);
        });
    });
}

function deleteContactForm(contactFormId) {
    return new Promise((resolve, reject) => {
        models.ContactForm.destroy({
            where: {id: contactFormId}
        }).then(() => {
            return resolve("Mensaje eliminado con éxito");
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
    createNewRanking,
    createNewGroup,
    partnerDoesNotExistsOnRanking,
    createNewPartner,
    findLastGroupNumber,
    getRankingGroupByNumber,
    updateFirstPartnerOfGroup,
    updateSecondPartnerOfGroup,
    updateThirdPartnerOfGroup,
    deleteGroup,
    deletePartners,
    getAllPartnersFromRanking,
    updateFirstPartnerOfGroupByRankingIdAndNumberOfGroup,
    updateSecondPartnerOfGroupByRankingIdAndNumberOfGroup,
    updateThirdPartnerOfGroupByRankingIdAndNumberOfGroup,
    getAllGroupsFromRanking,
    createMatch,
    setRankingRegistrationClosed,
    getAllRankings,
    getRankingData,
    getMatchesFromRanking,
    deleteRanking,
    setNotPlayedMatchesToLost,
    getResultOfMatchWhenPartnerOne,
    getResultOfMatchWhenPartnerTwo,
    deleteMatch,
    updateRankingJourney,
    getPartnerData,
    updateUserPoints,
    getContactForms,
    deleteContactForm,
}