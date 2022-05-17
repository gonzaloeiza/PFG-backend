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

function addResult(req, res, next) {
    const matchId = req.body.matchId;
    var partnerOneWins = req.body.partnerOneWins;
    if (partnerOneWins === "null") {
        partnerOneWins = null;
    }
    rankingsService.addResult(matchId, partnerOneWins).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function getOpenRankings(req, res, next) {
    rankingsService.getOpenRankings().then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports = {
    getMyRankings,
    getSpecificRanking,
    addResult,
    getOpenRankings,
}