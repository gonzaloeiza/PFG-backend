const { contactService } = require("../../services/").adminService;

function getContactForm(req, res, next) {
    contactService.getContactForm().then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

function deleteContactForm(req, res, next) {
    const contactFormId = req.body.contactFormId;

    contactService.deleteContactForm(contactFormId).then((data) => {
        return res.status(200).send({message: data});
    }).catch((err) => {
        return res.status(400).send({message: err});
    });
}

module.exports = {
    getContactForm,
    deleteContactForm,
}