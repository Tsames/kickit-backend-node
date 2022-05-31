//Dependencies
const express = require('express');
const mongoose = require('./models/connection');
const methodOverride = require('method-override');

//Shorthand Variables
const app = express();
const port = process.env.PORT;
const db = mongoose.connection;
const DATABASE_URL = process.env.DATABASE_URL;


//DataBase Connection
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Database Connection Error/Success Callbacks
db.on('error', (err) => console.log(' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//MiddleWare
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

//Routes
app.get('/', (req,res) => {
  res.send("Hello world!");
})

//Listen on port 3002
app.listen(port, (req,res) => {
  console.log(`Express is listening on port ${port}!`);
});