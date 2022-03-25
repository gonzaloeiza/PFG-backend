const databaseService = require("./database.services");

function login(email, password) {
    return new Promise((resolve, reject) => {
        databaseService.login(email, password).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}


module.exports = {
    login,
}