const express = require("express");
const router = express.Router();

const { authMiddleware } = require('../../middlewares').adminMiddleware;
const { rankingsController } = require('../../controllers').adminController;

router.get("/", authMiddleware.verifyToken, rankingsController.getRankings);
router.post("/createNewRanking", authMiddleware.verifyToken, rankingsController.createNewRanking);
router.post("/addPartnerToRanking", authMiddleware.verifyToken, rankingsController.addPartnerToRanking);
router.post("/startRanking", authMiddleware.verifyToken, rankingsController.startRanking);
router.delete("/deleteRanking", authMiddleware.verifyToken, rankingsController.deleteRanking);
router.get("/:rankingId", authMiddleware.verifyToken, rankingsController.getRankingData);
// router.post("/", authMiddleware.verifyToken, bookingsController.getBookings);
// router.delete("/", authMiddleware.verifyToken, bookingsController.deleteBooking);
// router.get("/courts", authMiddleware.verifyToken, bookingsController.getCourts);
// router.post("/handlePaid", authMiddleware.verifyToken, bookingsController.handlePaid);


module.exports = router;