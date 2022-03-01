const { userService} = require("../services"); 

function getUserProfile(req, res, next) {
    res.send(userService.getProfile());
}

module.exports =  {
    getUserProfile,
}