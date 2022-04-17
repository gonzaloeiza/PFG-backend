const databaseService = require("./database.services");

function getMyRankings(userId) {
    return new Promise((resolve, reject) => {
        databaseService.getRankingsOfUser(userId).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function getSpecificRanking(rankingId, userId) {
    return new Promise((resolve, reject) => {
        databaseService.isUserInscribedOnRanking(rankingId, userId).then((partnerData) => {
            databaseService.getDataOfSpecificRanking(rankingId, partnerData.id).then((rankingData) => {
                return resolve(rankingData);
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

module.exports = {
    getMyRankings,
    getSpecificRanking,
}