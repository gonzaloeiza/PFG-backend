const express = require("express");
const router = express.Router();

const middlewares = require('../middlewares');
const { courtsController } = require('../controllers');

router.get("/", courtsController.getCourtsData);

module.exports = router;