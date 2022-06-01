// ---------- Dependencies ----------

const express = require("express");
const Event = require("../models/event");

// ---------- Create Event Router ----------

const router = express.Router();

// ---------- Middleware ----------



// ---------- Event Router ----------

//Index Route
router.get("/events", (req, res) => {
  Event.find({}, (err, events) => {
    res.send(events);
  });
});

//Show Route
router.get("/events/:id", (req, res) => {
  const id = req.params.id;

  Event.findOne({ _id: id }, (err, event) => {
    if (req.session.loggedIn) {
      username = req.session.username;
      User.findOne({ username }, (err, user) => {
        res.render("./events/show.ejs", { user, event, session: req.session });
      });
    } else {
      res.render("./events/show.ejs", { event, session: req.session })
    }
  });
});

//Delete Route
router.delete("/events/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Event.findOneAndRemove({ _id: id }, (err, event) => {
    console.log("Deleted Event:");
    console.log(event);
    res.redirect("/events");
  });
});

//Update Route
router.put("/events/:id", (req, res) => {
  const id = req.params.id;

  Event.findById(id, (err, event) => {

    //Make new Date Object
    req.body.date = new Date(req.body.date + "T" + req.body.time);
    delete req.body.time;

    //Set other properties of the Body
    req.body.zip = Number(req.body.zip);

    //Set organizer and attendees
    req.body.attendees = event.attendees;
    req.body.organizer = event.organizer;

    console.log(req.body);

    Event.findByIdAndUpdate(id, req.body, { new: true }, (err, event) => {
      console.log(event);
      res.redirect("/events");
    });
  });
});

//Create Route
router.post("/events", (req, res) => {

  Event.create(req.body, (err, event) => {
    res.redirect("/");
  });

});

// ---------- Export Router ----------

module.exports = router;

///////////////////////////////////////