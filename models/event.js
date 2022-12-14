//Dependencies
const mongoose = require("../connection");

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
  organizerEmail: {
    type: String,
    required: true,
  },
  organizerName: {
    type: String,
    required: true,
  },
  organizerID: {
    type: String,
    required: true,
  }
});

const Event = model("Event", eventSchema);

//Export Event Model
module.exports = Event;