const express = require("express");
const router = express.Router();

const { authMiddleware } = require('../../middlewares').adminMiddleware;
const { bookingsController } = require('../../controllers').adminController;

router.post("/", authMiddleware.verifyToken, bookingsController.getBookings);
router.get("/courts", authMiddleware.verifyToken, bookingsController.getCourts);

module.exports = router;