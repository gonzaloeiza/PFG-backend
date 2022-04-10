const express = require("express");
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/courts/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});
const upload = multer({ storage: storage});

const { authMiddleware } = require('../../middlewares').adminMiddleware;
const { courtsController } = require('../../controllers').adminController;

router.get("/", authMiddleware.verifyToken, courtsController.getCourtsData);
router.post("/", authMiddleware.verifyToken, courtsController.createNewCourt)
router.put("/", authMiddleware.verifyToken, courtsController.updateCourtData);
router.post("/uploadPicture/:courtName", authMiddleware.verifyToken, upload.single("file"), courtsController.updatePicture);
router.delete("/:courtId", authMiddleware.verifyToken, courtsController.deleteCourt);

module.exports = router;