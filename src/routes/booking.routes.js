const express = require("express");
const router = express.Router();

const { bookingController } = require('../controllers');
const { authMiddleware, validationMiddleware } = require("../middlewares");

router.get("/courts", authMiddleware.verifyToken, bookingController.getCourts);
router.post("/disponibility", authMiddleware.verifyToken, validationMiddleware.validateDisponibility, bookingController.getDisponibility);

module.exports = router;