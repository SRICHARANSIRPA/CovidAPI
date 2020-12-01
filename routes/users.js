const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const Fawn = require("../middlewares/Fawn");
const _ = require("lodash");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.name });

  if (user)
    return res.status(400).send({
      message: "User Already Registered with this Mail Id",
      success: false,
    });

  user = new User(_.pick(req.body, ["name", "password", "isAdmin"]));

  user.password = user.generatePassword(req.body.password);

  try {
    new Fawn.Task().save("users", user).run();
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send({ success: true, data: _.pick(user, ["_id", "name"]) });
  } catch (er) {
    console.log(er);
    res.status(500).send({ message: "Internal Error", success: false });
  }
});

module.exports = router;
