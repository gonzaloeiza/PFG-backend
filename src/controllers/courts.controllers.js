const { courtsService } = require("../services");

function getCourtsData(req, res, next) {
    courtsService.getCourtsData().then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}


module.exports = {
    getCourtsData
}