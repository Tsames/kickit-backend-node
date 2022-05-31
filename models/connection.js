//Dependencies
require("dotenv").config({ debug: true });
const mongoose = require('mongoose');

//Shorthand for Connection arguments
const DATABASE_URL = process.env.MONGODB_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Create Connection Object
mongoose.connect(DATABASE_URL, CONFIG);

//Connection Events & Callbacks
mongoose.connection
  .on("open", () => console.log("Connection to MongoDB open"))
  .on("close", () => console.log("Connection to MongoDB closed"))
  .on("error", (err) => console.log(err));

//Export Connection
module.exports = mongoose;