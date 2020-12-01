const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .send({ message: "Access denied . No token Provided", success: false });
  try {
    const decoded = jwt.verify(token, config.get("JWT_PRIVATEKEY"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ message: "Invalid Token..", success: false });
  }
};
