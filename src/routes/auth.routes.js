const express = require("express");
const router = express.Router();

const middlewares = require('../middlewares');
const { authController } = require('../controllers');

router.post("/signin", authController.signIn);
router.post("/signup",middlewares.validationMiddleware.validateSignup, authController.signUp);

module.exports = router;