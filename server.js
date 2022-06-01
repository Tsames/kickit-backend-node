// ---------- Dependencies ----------

require("dotenv").config();
const express = require('express');
const morgan = require("morgan");
const EventRouter = require('./controllers/events');

// const session = require('express-session');
// const MongoStore = require('connect-mongo');


// ---------- Short-hand Variables ----------

const app = express();
const port = process.env.PORT;

// ---------- Middleware ----------

console.log(process.env.PORT);

app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(session({
//   secret: process.env.SECRET,
//   store: MongoStore.create({
//     mongoUrl: process.env.DATABASE_URL,
//     saveUninitialized: true,
//     resave: false
//   })
// }))

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