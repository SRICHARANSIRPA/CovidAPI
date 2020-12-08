const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const _ = require("lodash");
const Joi = require("joi");
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  // console.log("verified")
  if (error) {
    // console.log(error);
    return res
      .status(200)
      .send({ message: error.details[0].message, success: false });
  }

  let user = await User.findOne({ name: req.body.name });
  if (!user)
    return res
      .status(200)
      .send({ message: "Invalid email or password", success: false });
  const validPassword = user.isValidPassword(req.body.password);
  if (!validPassword)
    return res
      .status(200)
      .send({ message: "Login failed: incorrect password", success: false });
  const token = user.generateAuthToken();
  res.send({
    success: true,
    token: token,
    data: _.pick(user, ["_id", "name"]),
  });
});

const validate = (req) => {
  const schema = {
    name: Joi.string().required(),
    password: Joi.string().required().max(255),
  };
  return Joi.object(schema).validate(req, schema);
};

module.exports = router;
