const express = require("express");
const router = express.Router();

const user = require("./user.routes");
const auth = require("./auth.routes");

router.use("/user", user);
router.use("/auth", auth);


module.exports = router;