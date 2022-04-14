const express = require("express");
const router = express.Router();

const middlewares = require('../middlewares');
const { userController } = require('../controllers');

router.get("/", middlewares.authMiddleware.verifyToken, userController.getUserProfile);
router.post("/landingContactForm", middlewares.validationMiddleware.verifyContactForm, userController.submitContactForm);

module.exports = router;