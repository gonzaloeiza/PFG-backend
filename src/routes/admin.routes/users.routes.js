const express = require("express");
const { userController } = require("../../controllers");
const router = express.Router();

const { authMiddleware } = require('../../middlewares').adminMiddleware;
const { usersController } = require('../../controllers').adminController;

router.get("/", authMiddleware.verifyToken, usersController.getAllUsers);
router.get("/pendingUser", authMiddleware.verifyToken, usersController.getPendingUsers);
router.put("/pendingUser", authMiddleware.verifyToken, usersController.acceptUser);
router.delete("/pendingUser", authMiddleware.verifyToken, usersController.rejectUser);
router.post("/updateProfile", authMiddleware.verifyToken, usersController.updateProfile);
router.get("/:userId", authMiddleware.verifyToken, usersController.getUserData);
router.delete("/:userId", authMiddleware.verifyToken, usersController.deleteUser);

module.exports = router;