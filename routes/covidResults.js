const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Fawn = require("../middlewares/Fawn");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { validate, CovidResult } = require("../models/CovidResult");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(200).send({
      success: false,
      message: error.details[0].message,
    });
  let result = await CovidResult.findOne({ email: req.body.email });
  if (result)
    return res.status(200).send({
      success: false,
      message:
        " provided email is already associated with another  Home Test Kit",
    });
  let Existingresult = await CovidResult.findOne({ TTN: req.body.TTN });
  if (Existingresult)
    return res.status(200).send({
      success: false,
      message: " Another person has already used the provided TTN code",
    });
  result = new CovidResult(
    _.pick(req.body, [
      "FullName",
      "email",
      "Age",
      "Result",
      "Address",
      "TTN",
      "Postcode",
    ])
  );
  try {
    new Fawn.Task().save("covidresults", result).run();
    res.send({
      success: true,
      details: _.pick(result, ["_id", "name", "email"]),
      message: "Successfully Data Saved ",
    });
  } catch (er) {
    // console.log(er);
    res.status(500).send({ success: false, message: "Internal Error" });
  }
});

router.get("/", [auth, admin], async (req, res) => {
  let users = await CovidResult.find().sort("FullName");
  return res.status(201).send({
    success: true,
    data: users,
  });
});

module.exports = router;
