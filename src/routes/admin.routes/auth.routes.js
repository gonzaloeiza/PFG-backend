const express = require("express");
const router = express.Router();

const { validationMiddleware, authMiddleware } = require('../../middlewares').adminMiddleware;
const { authController } = require('../../controllers').adminController;


router.post("/signin", validationMiddleware.validateLogin, authController.signin);
router.put("/updatePassword", authMiddleware.verifyToken, authController.updatePassword);

module.exports = router;