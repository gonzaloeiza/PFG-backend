const {userService} = require("../services"); 

function getUserProfile(req, res, next) {
    const userId = req.userId;
    userService.getProfile(userId)
    .then((data) => {
        return res.status(200).send(data);
    }).catch((err) => {
        return res.status(400).send(err);
    });
}

module.exports = {
    getUserProfile,
}