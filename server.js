//Dependencies
const express = require('express');

//Shorthand
const app = express();


//Get Route
app.get('/', (req,res) => {
  res.send("Hello world!");
})

//Another Get Route



//Listen on port 3002
app.listen(3002, (req,res) => {
  console.log("Express is listening on port 3002!");
});