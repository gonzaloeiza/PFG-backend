const databaseService = require("./database.services");
const emailService = require("./email.services");

function signIn(email, password) {
    return new Promise((resolve, reject) => {
        databaseService.signIn(email, password).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}


function signUp(userData) {
    return new Promise((resolve, reject) => {
        databaseService.signUp(userData).then((data) => {
            emailService.sendSignUpEmail(userData.email, userData.name);
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function forgotPassword(userEmail) {
    return new Promise((resolve, reject) => {

    });
}


module.exports = {
    signIn,
    signUp,
    forgotPassword
}