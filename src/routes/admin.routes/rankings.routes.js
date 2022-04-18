const express = require("express");
const router = express.Router();

const { authMiddleware } = require('../../middlewares').adminMiddleware;
const { rankingsController } = require('../../controllers').adminController;

router.get("/", authMiddleware.verifyToken, rankingsController.getRankings);
router.post("/createNewRanking", authMiddleware.verifyToken, rankingsController.createNewRanking);
router.post("/addPartnerToRanking", authMiddleware.verifyToken, rankingsController.addPartnerToRanking);
router.post("/startRanking", authMiddleware.verifyToken, rankingsController.startRanking);
router.delete("/deleteRanking", authMiddleware.verifyToken, rankingsController.deleteRanking);
router.post("/generateNewJourney", authMiddleware.verifyToken, rankingsController.generateNewJourney);
router.get("/:rankingId", authMiddleware.verifyToken, rankingsController.getRankingData);


module.exports = router;