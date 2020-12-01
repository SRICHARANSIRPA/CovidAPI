require("express-async-errors");

/*express-async-errors this is usefull when any async got a Runtime Exception it will smoothly paass it to the next middleware */
module.exports = function () {
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
