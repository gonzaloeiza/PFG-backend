const { usersService } = require("../../services").adminService;

function getPendingUsers(req, res, next) {
    usersService.getPendingUsers().then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function acceptUser(req, res, next) {
    const userId = req.body.userId;
    usersService.acceptUser(userId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function rejectUser(req, res, next) {
    const userId = req.body.userId;
    usersService.rejectUser(userId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function getAllUsers(req, res, next) {
    usersService.getAllUsers().then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function getUserData(req, res, next) {
    const userId = Number(req.params.userId);
    usersService.getUserData(userId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports = {
    getPendingUsers,
    acceptUser,
    rejectUser,
    getAllUsers,
    getUserData,
}