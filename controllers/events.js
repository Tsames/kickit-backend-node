// ---------- Dependencies ----------

const express = require("express");
const Event = require("../models/event");
const jwt = require('jsonwebtoken');

// ---------- Create Event Router ----------

const eventRouter = express.Router();

// ---------- Middleware ----------

function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
  
}

// ---------- Event Router ----------

//Normal Index Route
eventRouter.get("/", async (req, res) => {
  try {
    const data = await Event.find({})
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json({ message: error.message })
  }
});

//Get all events created by current user
eventRouter.get("/", authenticateToken, async (req, res) => {

  try {

    const email = req.user.email;

    const data = await Event.find({ organizerEmail: email })
    res.send(data);

  } catch(error) {

    res.status(500).json({ message: error.message })

  }

});

//Show Route
eventRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Event.findOne({ _id: id });
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json({ message: error.message })
  }
});

//Search Database for
eventRouter.get("/search/:input", async (req, res) => {
  const searchInput = req.params.input;

  try {
    const data = await Event.find({
      $or: [
        { title: searchInput },
        { title: /searchInput/ }
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

//Delete Route
eventRouter.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    Event.findByIdAndDelete(id);
    res.send(`Document with title ${req.body.title} has been deleted...`);
  } catch(error) {
    res.status(400).json({ message: error.message })
  }
});

//Update Route
eventRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; 
    const newData = req.body;
    const options = { new: true };

    const result = await Event.findByIdAndUpdate(id, newData, options);
    res.send(result);

  } catch(error) {

    res.status(400).json({ message: error.message })
  }
});

//Create Route
eventRouter.post('/', async (req, res) => {

  const { title, location, description, early, late, days, attending, organizerEmail, organizerName } = req.body;

  const data = new Event({
    title: title,
    location: location,
    description: description,
    early: early,
    late: late,
    days: days,
    attending: attending,
    organizerEmail: organizerEmail,
    organizerName: organizerName
  })

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// ---------- Export Router ----------

module.exports = eventRouter;

///////////////////////////////////////