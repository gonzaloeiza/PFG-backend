const express = require("express");
const router = express.Router();

const auth = require("./auth.routes");
const user = require("./user.routes");
const booking = require("./booking.routes");

router.use("/auth", auth);
router.use("/user", user);
router.use("/booking", booking);

module.exports = router;