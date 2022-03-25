const authMiddleware = require("./auth.middlewares");
const validationMiddleware = require("./validation.middlewares");
const adminMiddleware = require("./admin.middlewares");

module.exports = {
    authMiddleware,
    validationMiddleware,
    adminMiddleware,
}