const { authService } = require("../../services").adminService;

function login(req, res, next) {
    // res.send("admin auth controller ");
    res.send(authService.login());
}

module.exports = {
    login,
}