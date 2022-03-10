const models = require("../database/models");

function getProfile(userId) {
    return new Promise((resolve, reject) => {
       return resolve("getting user's profile: " + userId);
    });
}

module.exports = {
    getProfile,
}