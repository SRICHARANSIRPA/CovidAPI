const mongoose = require("mongoose");
const joi = require("joi");

const ResultType = ["POSITIVE", "NEGATIVE", "INCONCLUSIVE"];

const validTTNCodes = [
  "MM2874Z6",
  "FEQQ6UUG",
  "34GC829B",
  "CB8FBCCM",
  "8RL4ENTK",
  "57UBS5J6",
  "4F7YKH9G",
  "R9KZ2NXL",
  "YBQUVXHL",
  "CCZTQ8KW",
];

const CovidResultSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
    min: 5,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  Result: {
    type: String,
    enum: ResultType,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  TTN: {
    type: String,
    enum: validTTNCodes,
    required: true,
  },
  Postcode: {
    type: String,
    required: true,
  },
});

const validateCovidResult = function (result) {
  const schema = {
    FullName: joi.string().min(5).max(20).required(),
    email: joi.string().email().required(),
    Age: joi.number().required().min(1),
    Result: joi.string().required(),
    Address: joi.string().required(),
    TTN: joi.string().required(),
    Postcode: joi.string().required(),
  };
  return joi.object(schema).validate(result);
};

exports.CovidResult = mongoose.model("covidresults", CovidResultSchema);
exports.validate = validateCovidResult;
