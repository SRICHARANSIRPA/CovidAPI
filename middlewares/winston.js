const winston = require("winston");
require("winston-mongodb");
const connectionURL = require("../util/dataBaseUrl");
options = [
  new winston.transports.File({ filename: "logfile.log" }),
  new winston.transports.MongoDB({
    db: connectionURL,
    options: {
      poolSize: 2,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
];

const logger = winston.createLogger({
  transports: options,
  exceptionHandlers: [
    new winston.transports.File({ filename: "unCaughtExpections.log" }),
  ],
});

module.exports = logger;
