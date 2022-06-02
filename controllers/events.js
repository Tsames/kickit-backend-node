// ---------- Dependencies ----------

const express = require("express");
const Event = require("../models/event");

// ---------- Create Event Router ----------

const router = express.Router();

// ---------- Middleware ----------



// ---------- Event Router ----------

//Index Route
router.get("/", async (req, res) => {
  try {
    const data = await Event.find({})
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json({ message: error.message })
  }
});

//Show Route
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Event.findOne({ _id: id });
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json({ message: error.message })
  }
});

//Delete Route
router.delete("/:id", (req, res) => {
  // const id = req.params.id;
  // console.log(id);
  // Event.findOneAndRemove({ _id: id }, (err, event) => {
  //   console.log("Deleted Event:");
  //   console.log(event);
  //   res.redirect("/events");
  // });
});

//Update Route
router.put("/:id", async (req, res) => {
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
router.post('/', async (req, res) => {

  const data = new Event({
    title: req.body.title,
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

module.exports = router;

///////////////////////////////////////