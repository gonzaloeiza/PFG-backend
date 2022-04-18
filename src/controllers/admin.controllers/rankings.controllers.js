const models = require("../../database/models");
const { rankingsService } = require("../../services/admin.services");

function getRankings(req, res, next) {
    rankingsService.getRankings().then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}


function createNewRanking(req, res, next) {
    var rankingData = {};
    rankingData.name = req.body.name;
    
    if (req.body.description !== "" && req.body.description !== undefined && req.body.description !== null) {
        rankingData.description = req.body.description;
    }
    
    rankingsService.createNewRanking(rankingData).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });

}

function addPartnerToRanking(req, res, next) {
    const rankingId = req.body.rankingId;
    const playerOneId = req.body.playerOneId;
    const playerTwoId = req.body.playerTwoId;

    rankingsService.addPartnerToRanking(rankingId, playerOneId, playerTwoId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}


function startRanking(req, res, next) {
    const rankingId = req.body.rankingId;

    rankingsService.startRanking(rankingId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function getRankingData(req, res, next) {
    const rankingId = req.params.rankingId;

    rankingsService.getRankingData(rankingId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function deleteRanking(req, res, next) {
    const rankingId = req.body.rankingId;

    rankingsService.deleteRanking(rankingId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function generateNewJourney(req, res, next) {
    const rankingId = req.body.rankingId;

    rankingsService.generateNewJourney(rankingId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports = {
    getRankings,
    createNewRanking,
    addPartnerToRanking,
    startRanking,
    getRankingData,
    deleteRanking,
    generateNewJourney,
}