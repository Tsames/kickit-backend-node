//Dependencies
const mongoose = require("./connection");

//Shorthand Variables
const Schema = mongoose.Schema;
const model = mongoose.model;

//Define USer Schema
const userSchema = new Schema({
  email: String,
  password: String,
  name: String
});

const User = model("User", userSchema);

//Export USer Model
module.exports = User;