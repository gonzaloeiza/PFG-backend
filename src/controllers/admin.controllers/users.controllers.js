const { usersService } = require("../../services").adminService;
const bcrypt = require("bcryptjs");

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

function updateProfile(req, res, next) {
    var userData = {};
    const userId = Number(req.body.id);
    userData.email = req.body.email;
    userData.dni = req.body.dni.toLowerCase();
    userData.phoneNumber = req.body.phoneNumber;
    userData.name = req.body.name;
    userData.firstSurname = req.body.firstSurname;
    userData.secondSurname = req.body.secondSurname;
    userData.dateBirth = req.body.dateBirth;
    userData.gender = req.body.gender;
    userData.direction = req.body.direction;
    userData.poblation = req.body.poblation;
    userData.postalCode = req.body.postalCode;
    userData.province = req.body.province;
    userData.pendingSignUp = req.body.pendingSignUp;
    if (req.body.newPassword !== undefined && req.body.newPassword !== null && req.body.newPassword !== "") {
        userData.passwordHash = bcrypt.hashSync(req.body.newPassword, 8);
    }
    usersService.updateProfile(userId, userData).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function deleteUser(req, res, next) {
    const userId = Number(req.params.userId);
    usersService.deleteUser(userId).then((data) => {
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
    updateProfile,
    deleteUser,
}