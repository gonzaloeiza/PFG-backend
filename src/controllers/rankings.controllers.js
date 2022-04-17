const { rankingsService } = require("../services");

function getMyRankings(req, res, next) {
    const userId = req.userId;
    rankingsService.getMyRankings(userId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function getSpecificRanking(req, res, next) {
    const userId = req.userId;
    const rankingId = Number(req.params.rankingId);
    rankingsService.getSpecificRanking(rankingId, userId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports = {
    getMyRankings,
    getSpecificRanking,
}