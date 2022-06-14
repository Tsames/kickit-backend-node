//Dependencies
const mongoose = require("./connection");

//Shorthand Variables
const Schema = mongoose.Schema;
const model = mongoose.model;

//Define Event Schema
const eventSchema = new Schema({
  title: String,
  location: String,
  description: String,
  cost: String,
  early: Number,
  late: Number,
  days: [Number],
  attending: [{name: String, available: [{column: Number, rows: [Number]}]}]
});

const Event = model("Event", eventSchema);

//Export Event Model
module.exports = Event;