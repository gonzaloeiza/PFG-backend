const { courtsService } = require("../services");

function getCourtData(req, res, next) {
    const courtId = req.params.courtId;
    courtsService.getCourtData(courtId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}


module.exports = {
    getCourtData
}