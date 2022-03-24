const express = require("express");
const router = express.Router();

const { bookingController } = require('../controllers');
const { authMiddleware, validationMiddleware } = require("../middlewares");

router.get("/courts", authMiddleware.verifyToken, bookingController.getCourts);
router.post("/disponibility", authMiddleware.verifyToken, validationMiddleware.validateDisponibility, bookingController.getDisponibility);
router.post("/bookCourt", authMiddleware.verifyToken, validationMiddleware.validateBooking, bookingController.book);
router.post("/", authMiddleware.verifyToken, validationMiddleware.validateGetBookings, bookingController.getBookings);
router.delete("/", authMiddleware.verifyToken, validationMiddleware.validateCancelation, bookingController.cancelBooking);

module.exports = router;