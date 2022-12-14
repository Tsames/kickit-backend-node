// ---------- Dependencies ----------

require("dotenv").config();
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');
const EventRouter = require('./controllers/events');
const UserRouter = require('./controllers/users');

// ---------- Short-hand Variables ----------

const app = express();
const port = process.env.PORT || 3000;

// ---------- Middleware ----------

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
  origin: 'http://localhost:3000',
  origin: 'http://kick-it.live'
}));

// ---------- Routers ----------

app.use("/events", EventRouter)

app.use("/users", UserRouter)

app.get('/', (req,res) => {
  res.send("You've reached the Kick-it backend API built with Node, Express, and Mongoose!");
})

// ---------- Server Listener ----------

app.listen(port, (req,res) => {
  console.log(`Express is listening on port ${port}!`);
});

/////////////////////////////////////////