const databaseService = require("./database.services");

function signin(email, password) {
    return new Promise((resolve, reject) => {
        databaseService.signin(email, password).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}


module.exports = {
    signin,
}