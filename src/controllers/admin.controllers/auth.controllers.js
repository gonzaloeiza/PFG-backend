const { authService } = require("../../services").adminService;

function login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    authService.login(email, password).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports = {
    login,
}