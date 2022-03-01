const express = require("express");
const router = express.Router();

// const middlwares = require('../middlewares');
const { userController } = require('../controllers');

router.get("/", userController.getUserProfile);



module.exports = router;