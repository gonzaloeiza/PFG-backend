const {userService} = require("../services"); 

function getUserProfile(req, res, next) {
    const userId = req.userId;
    userService.getProfile(userId)
    .then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function submitContactForm(req, res, next) {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const message = req.body.message;

    userService.submitContactForm(name, surname, email, message).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports = {
    getUserProfile,
    submitContactForm,
}