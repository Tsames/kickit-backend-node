// ---------- Dependencies ----------

const express = require("express");
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

//Show Route
userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

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

// //Update Route
// userRouter.put("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const newData = req.body;
//     const options = { new: true };

//     const result = await User.findByIdAndUpdate(id, newData, options);
//     res.send(result);

//   } catch (error) {

//     res.status(400).json({ message: error.message })
//   }
// });

//Create Route
userRouter.post('/', async (req, res) => {

  const data = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
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