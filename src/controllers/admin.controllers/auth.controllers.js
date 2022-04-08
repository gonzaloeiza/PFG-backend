const { authService } = require("../../services").adminService;
const bcrypt = require("bcryptjs");

function signin(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    authService.signin(email, password).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function updatePassword(req, res, next) {
    const adminId = req.adminId;
    const newPassword = bcrypt.hashSync(req.body.newPassword, 8);

    authService.updatePassword(adminId, newPassword).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports = {
    signin,
    updatePassword,
}