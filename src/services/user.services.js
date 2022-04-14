const databaseService = require("./database.services");

function getProfile(userId) {
    return new Promise((resolve, reject) => {
       return resolve("getting user's profile: " + userId);
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

module.exports = {
    getProfile,
    submitContactForm,
}