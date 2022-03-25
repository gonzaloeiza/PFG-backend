/*
solo implementar la de validar login, ya que se entiende que si es el administrador (y pasa el middleware de autenticación), 
no va intentar modificar las peticiones para realizar ataques.
*/
const { validationService } = require("../../services");

function validateLogin(req, res, next) {
    if (validationService.validateEmailRegex(req.body.email))  {
        return next();
    } else {
        return res.status(400).send({message: "Formato de email inválido"});
    }
}

module.exports = {
    validateLogin,
}
