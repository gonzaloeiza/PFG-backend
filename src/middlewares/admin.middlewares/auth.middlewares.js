const jwtSecret = process.env.JWT_SECRET
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send(
            {message: "No estás autorizado"}
        );
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
        return res.status(401).send(
            {message: "No estás autorizado"});
    }
    req.adminId = decoded.id;
    next();
  });
}

module.exports = {
    verifyToken
}