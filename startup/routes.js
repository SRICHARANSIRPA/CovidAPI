const users = require("../routes/users");
const auth = require("../routes/auth");
const covidresults = require("../routes/covidResults");
const express = require("express");
const error = require("../middlewares/error");
var cors = require("cors");

var corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};
module.exports = function (app) {
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use("/api/users", users);
  console.log("success");
  app.use("/api/auth", auth);
  app.use("/api/covidData", covidresults);
  app.use(error);
};
