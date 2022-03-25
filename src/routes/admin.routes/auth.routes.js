const express = require("express");
const router = express.Router();

const { validationMiddleware } = require('../../middlewares').adminMiddleware;
const { authController } = require('../../controllers').adminController;


router.post("/login", validationMiddleware.validateLogin, authController.login);

module.exports = router;