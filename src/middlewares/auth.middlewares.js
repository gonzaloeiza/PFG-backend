const {jwtSecret} = require("../config");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send(
            {message: "Could not find token"}
        );
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
        return res.status(401).send(
            {message: "Unauthorized!"});
    }
    req.userId = decoded.id;
    next();
  });

}

module.exports = {
    verifyToken
}