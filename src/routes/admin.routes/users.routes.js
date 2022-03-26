const express = require("express");
const router = express.Router();

const { authMiddleware } = require('../../middlewares').adminMiddleware;
const { usersController } = require('../../controllers').adminController;

router.get("/pendingUser", authMiddleware.verifyToken, usersController.getPendingUsers);
router.put("/pendingUser", authMiddleware.verifyToken, usersController.acceptUser);
router.delete("/pendingUser", authMiddleware.verifyToken, usersController.rejectUser);
module.exports = router;