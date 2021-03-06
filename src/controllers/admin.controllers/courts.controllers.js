const { courtsService } = require("../../services/admin.services");

function getCourtsData(req, res, next) {
    courtsService.getCourtsData().then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function updateCourtData(req, res, next) {
    const courtId = Number(req.body.id);
    var courtData = {};
    courtData.name = req.body.name;
    courtData.description = req.body.description;
    courtData.smartCitizenId = req.body.smartCitizenId;
    courtData.bookReservationTime = Number(req.body.bookReservationTime);
    courtData.priceWithoutLight = Number(req.body.priceWithoutLight);
    courtData.priceWithLight = Number(req.body.priceWithLight);
    courtData.numberOfDaysToBookBefore = Number(req.body.numberOfDaysToBookBefore);
    courtData.numberOfHoursToCancelCourt = Number(req.body.numberOfHoursToCancelCourt);
    courtData.opensAt = req.body.opensAt;
    courtData.closesAt = req.body.closesAt;

    courtsService.updateCourtData(courtId, courtData).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function deleteCourt(req, res, next) {
    const courtId = Number(req.params.courtId);
    courtsService.deleteCourt(courtId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function createNewCourt(req, res, next) {
    const courtData = req.body;
    courtsService.createNewCourt(courtData).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function updatePicture(req, res, next) {
    const courtName = req.params.courtName;
    var courtData = {};
    courtData.picture = req.file.filename;
    courtsService.updateCourtPicture(courtName, courtData).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports = {
    getCourtsData,
    updateCourtData,
    deleteCourt,
    createNewCourt,
    updatePicture,
}