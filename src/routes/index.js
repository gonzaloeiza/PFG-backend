const express = require("express");
const router = express.Router();

const auth = require("./auth.routes");
const user = require("./user.routes");
const booking = require("./booking.routes");
const courts = require("./courts.routes");
const admin = require("./admin.routes");

router.use("/auth", auth);
router.use("/user", user);
router.use("/booking", booking);
router.use("/courts", courts);
router.use("/admin", admin);

module.exports = router;