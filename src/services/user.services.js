const databaseService = require("./database.services");

function getProfile(userId) {
    return new Promise((resolve, reject) => {
        databaseService.getUserData(userId).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function submitContactForm(name, surname, email, message) {
    return new Promise((resolve, reject) => {
        databaseService.addContactForm(name, surname, email, message).then((data) => {
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

function deleteAccount(userId) {
    return new Promise((resolve, reject) => {
        databaseService.deleteUserAccount(userId).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

module.exports = {
    getProfile,
    submitContactForm,
    updateProfile,
    deleteAccount,
}