//Dependencies
const mongoose = require("../connections/mongodb");

//Shorthand Variables
const Schema = mongoose.Schema;
const model = mongoose.model;

//Define USer Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name: String
});

const User = model("User", userSchema);

//Export USer Model
module.exports = User;