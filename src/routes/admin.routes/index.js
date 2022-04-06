const express = require("express");
const router = express.Router();

const auth = require("./auth.routes");
const users = require("./users.routes");
const bookings = require("./bookings.routes");
const courts = require("./courts.routes");


router.use("/auth", auth);
router.use("/users", users);
router.use("/bookings", bookings);
router.use("/courts", courts);

module.exports = router;