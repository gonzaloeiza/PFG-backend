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
    //TO-DO enviar correo de que se ha aceptado su solicitud
    return new Promise((resolve, reject) => {
        databaseService.acceptUser(userId).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function rejectUser(userId) {
    //TO-DO enviar correo de que se ha rechazado su solicitud
    return new Promise((resolve, reject) => {
        databaseService.rejectUser(userId).then((data) => {
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
}