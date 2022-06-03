// ---------- Dependencies ----------

require("dotenv").config();
const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const EventRouter = require('./controllers/events');

// ---------- Short-hand Variables ----------

const app = express();
const port = process.env.PORT;

// ---------- Middleware ----------

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ---------- Routers ----------

app.use("/events", EventRouter)

app.get('/', (req,res) => {
  res.send("Hello world!");
})

// ---------- Server Listener ----------

app.listen(port, (req,res) => {
  console.log(`Express is listening on port ${port}!`);
});

/////////////////////////////////////////