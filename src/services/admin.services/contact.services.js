const databaseService = require("./database.services");

function getContactForm() {
    return new Promise((resolve, reject) => {
        databaseService.getContactForms().then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function deleteContactForm(contactFormId) {
    return new Promise((resolve, reject) => {
        databaseService.deleteContactForm(contactFormId).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

module.exports = {
    getContactForm,
    deleteContactForm,
}