const emailService = require("../email.services");
const databaseService = require("./database.services");

function getPendingUsers() {
    return new Promise((resolve, reject) => {
        databaseService.getPendingUsers().then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function acceptUser(userId) {
    return new Promise((resolve, reject) => {
        databaseService.acceptUser(userId).then((data) => {
            databaseService.getUserData(userId).then((userData) => {
                emailService.sendAcceptRegistrationRequest(userData.email, userData.name);
                return resolve(data);
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function rejectUser(userId) {
    //TO-DO enviar correo de que se ha rechazado su solicitud
    return new Promise((resolve, reject) => {
        databaseService.getUserData(userId).then((userData) => {
            databaseService.rejectUser(userId).then((data) => {
                emailService.sendRejectRegistrationRequest(userData.email, userData.name);
                return resolve(data);
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function getAllUsers() {
    return new Promise((resolve, reject) => {
        databaseService.getAllUsers().then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        }); 
    });
}

function getUserData(userId) {
    return new Promise((resolve, reject) => {
        const promises = [
            databaseService.getUserData(userId),
            databaseService.getUserBookings(userId)
        ];

        Promise.all(promises).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function updateProfile(userId, userData) {
    return new Promise((resolve, reject) => {
        databaseService.updateUserProfile(userId, userData).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });        
    });
}

function deleteUser(userId) {
    return new Promise((resolve, reject) => {
        databaseService.deleteUser(userId).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

module.exports = {
    getPendingUsers,
    acceptUser,
    rejectUser,
    getAllUsers,
    getUserData,
    updateProfile,
    deleteUser,
}