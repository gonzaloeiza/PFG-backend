const express = require("express");
const router = express.Router();

const { bookingController } = require('../controllers');
const { authMiddleware } = require("../middlewares");

router.get("/courts", authMiddleware.verifyToken, bookingController.getCourts);

module.exports = router;