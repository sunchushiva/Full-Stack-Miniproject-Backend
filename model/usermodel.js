const mongoose = require("mongoose");

const signSchema = mongoose.Schema({
  email: String,
  password: String,
  age: Number,
  location: String,
});

const SignModel = mongoose.model("user", signSchema);

module.exports = {
  SignModel,
};
