const express = require("express");
const router = express.Router();

const { validationMiddleware } = require('../../middlewares').adminMiddleware;
const { authController } = require('../../controllers').adminController;


router.post("/signin", validationMiddleware.validateLogin, authController.signin);

module.exports = router;