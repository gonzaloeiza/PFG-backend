const express = require("express");
const router = express.Router();

const middlewares = require('../middlewares');
const { userController } = require('../controllers');

router.get("/", middlewares.authMiddleware.verifyToken, userController.getUserProfile);
router.put("/", middlewares.authMiddleware.verifyToken, middlewares.validationMiddleware.validateUserProfile, userController.updateProfile);
router.delete("/", middlewares.authMiddleware.verifyToken, middlewares.validationMiddleware.validationNoPendingBookingsToPay, userController.deleteAccount);
router.post("/landingContactForm", middlewares.validationMiddleware.verifyContactForm, userController.submitContactForm);
router.post("/restorePassword", middlewares.validationMiddleware.validateRestorePassword, userController.requestRestorePassword);
router.post("/restorePassword/:tokenId", middlewares.validationMiddleware.validateRestorePasswordToken, userController.restorePassword);
module.exports = router;