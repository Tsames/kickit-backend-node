//Dependencies
const mongoose = require("../connections/mongodb");

//Shorthand Variables
const Schema = mongoose.Schema;
const model = mongoose.model;

//Define Event Schema
const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: String,
  early: Number,
  late: Number,
  days: [Number],
  attending: [{name: String, available: [[Number, Number, Number]]}],
});

const Event = model("Event", eventSchema);

//Export Event Model
module.exports = Event;