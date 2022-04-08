const express = require("express");
const router = express.Router();

const middlewares = require('../middlewares');
const { courtsController } = require('../controllers');

router.get("/:courtId", middlewares.authMiddleware.verifyToken, middlewares.validationMiddleware.validateCourt, courtsController.getCourtData);


module.exports = router;