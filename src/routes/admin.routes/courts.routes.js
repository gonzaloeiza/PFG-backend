const express = require("express");
const router = express.Router();

const { authMiddleware } = require('../../middlewares').adminMiddleware;
const { courtsController } = require('../../controllers').adminController;

router.put("/", authMiddleware.verifyToken, courtsController.updateCourtData);
router.delete("/:courtId", authMiddleware.verifyToken, courtsController.deleteCourt);

module.exports = router;