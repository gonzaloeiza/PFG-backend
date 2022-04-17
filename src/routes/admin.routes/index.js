const express = require("express");
const router = express.Router();

const auth = require("./auth.routes");
const users = require("./users.routes");
const bookings = require("./bookings.routes");
const courts = require("./courts.routes");
const rankings = require("./rankings.routes");

router.use("/auth", auth);
router.use("/users", users);
router.use("/bookings", bookings);
router.use("/courts", courts);
router.use("/rankings", rankings);

module.exports = router;