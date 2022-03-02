const express = require("express");
const router = express.Router();

// const middlwares = require('../middlewares');
const { authController } = require('../controllers');

router.post("/signin", authController.signIn);
router.post("/signup", authController.signUp);

module.exports = router;