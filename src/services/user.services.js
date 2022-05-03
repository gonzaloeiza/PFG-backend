const databaseService = require("./database.services");
const emailService = require("./email.services");
const jwt = require("jsonwebtoken");

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

function requestRestorePassword(userEmail) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({ restorePasswordEmail: userEmail }, process.env.JWT_RESTORE_PASSWORD_SECRET, {
            expiresIn: `${process.env.JWT_RESTORE_PASSWORD_EXPIRESINSECONDS}s`
        });

        databaseService.getUserNameByEmail(userEmail).then((userData) => {
            const link = process.env.FRONTEND_URL + "restorePassword/" + token;
            if (emailService.sendRestorePasswordLink(userEmail, userData.name, link)) {
                return resolve("Se ha enviado un email de restablecimiento de contraseña");
            } else {
                return reject("Ha ocurrido un error, intentalo de nuevo más tarde");
            }
        });
    }).catch((err) => {
        return reject(err);
    });
}

function restorePassword(email, password) {
    return new Promise((resolve, reject) => {
        databaseService.changeUserPassword(email, password).then(() => {
            databaseService.getUserNameByEmail(email).then((userData) => {
                emailService.sendChangedPasswordConfirmation(email, userData.name);
                return resolve("Contraseña restablecida con éxito");
            }).catch((err) => {
                return reject(err);
            });
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
    requestRestorePassword,
    restorePassword,
}