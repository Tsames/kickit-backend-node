// ---------- Dependencies ----------

const express = require('express');
const brcypt = require('bcrypt');
const User = require("../models/user");

// ---------- Create User Router ----------

const userRouter = express.Router();

// ---------- Middleware ----------


// ---------- User Router ----------

//Index Route
userRouter.get("/", async (req, res) => {
  try {
    const data = await User.find({})
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

//Login Route
userRouter.post("/login", async (req, res) => {
  
  const { name, email, password } = req.body
  const hash = await brcypt.hash(password, 13)

  try {
    const data = await User.findOne({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

//Delete Route
userRouter.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    User.findByIdAndDelete(id);
    res.send(`User with name ${req.body.name} has been deleted...`);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

//Signup Route
userRouter.post('/signup', async (req, res) => {

  const { name, email, password } = req.body
  const hash = await brcypt.hash(password, 13)

  const data = new User({
    name: name,
    email: email,
    password: hash,
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

module.exports = userRouter;

///////////////////////////////////////