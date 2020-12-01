const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(5).max(20).required(),
    password: Joi.string().required().max(255),
    isAdmin: Joi.boolean().required(),
  };
  return Joi.object(schema).validate(user, schema);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("JWT_PRIVATEKEY")
  );
  return token;
};

userSchema.methods.isValidPassword = function (password) {
  const hash = crypto
    .createHmac("SHA256", config.get("PWD_SECRET"))
    .update(password)
    .digest("hex");
  return hash === this.password;
};
userSchema.methods.generatePassword = function (password) {
  const hash = crypto
    .createHmac("SHA256", config.get("PWD_SECRET"))
    .update(password)
    .digest("hex");
  return hash;
};

exports.User = mongoose.model("users", userSchema);
exports.validate = validateUser;
