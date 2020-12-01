const mongoose = require("mongoose");
const logger = require("../middlewares/winston");
const connectionUrl = require("../util/dataBaseUrl");

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
module.exports = function () {
  mongoose.connect(connectionUrl, options).then(() => {
    logger.info("Connected to MongoDB...");
  });
};
