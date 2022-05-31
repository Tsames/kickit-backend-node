//Dependencies
require("dotenv").config(); //Load Variables from .env
const mongoose = require("mongoose"); //Load Mongoose

//Shorthand for Connection arguments
const DATABASE_URL = process.env.DATABASE_URL; //DATABASE_URL from .env
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
  .on("error", () => console.log(error));

//Export Connection
module.exports = mongoose;