const express = require("express");
const router = express.Router();

const middlewares = require('../../middlewares');
const { authController } = require('../../controllers').adminController;


router.post("/login", authController.login);

module.exports = router;