const express = require("express");
const router = express.Router();

const { authMiddleware } = require('../../middlewares').adminMiddleware;
const { bookingsController } = require('../../controllers').adminController;

router.post("/", authMiddleware.verifyToken, bookingsController.getBookings);
router.delete("/", authMiddleware.verifyToken, bookingsController.deleteBooking);
router.get("/courts", authMiddleware.verifyToken, bookingsController.getCourts);
router.post("/handlePaid", authMiddleware.verifyToken, bookingsController.handlePaid);


module.exports = router;