const config = require("config");
module.exports = function () {
  if (!config.get("JWT_PRIVATEKEY")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
};
