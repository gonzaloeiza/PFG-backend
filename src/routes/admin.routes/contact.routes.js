const express = require("express");
const router = express.Router();

const { authMiddleware } = require('../../middlewares').adminMiddleware;
const { contactController } = require('../../controllers').adminController;

router.get("/", authMiddleware.verifyToken, contactController.getContactForm);
router.delete("/", authMiddleware.verifyToken, contactController.deleteContactForm);

module.exports = router;