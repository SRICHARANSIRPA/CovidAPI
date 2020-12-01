const logger = require("./winston");
module.exports = function (err, req, res, next) {
  logger.error(err.message, { metadata: err });
  console.log(new Error(err));
  res.status(500).send({ success: false, message: "Something Failed" });
};
