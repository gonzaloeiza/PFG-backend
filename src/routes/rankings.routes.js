const express = require("express");
const router = express.Router();

const middlewares = require('../middlewares');
const { rankingsController } = require('../controllers');

router.get("/", middlewares.authMiddleware.verifyToken, rankingsController.getMyRankings);
router.put("/addResult", middlewares.authMiddleware.verifyToken, middlewares.validationMiddleware.validateAddResult,  rankingsController.addResult);
router.get("/:rankingId", middlewares.authMiddleware.verifyToken,middlewares.validationMiddleware.validateRankingId, rankingsController.getSpecificRanking);

module.exports = router;