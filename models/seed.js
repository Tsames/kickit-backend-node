//Dependencies
const mongoose = require("./connection");
const Event = require("./event");

mongoose.connection.on("open", () => {

  //Create sample event data
  const sampleEvents = [
    {title: "Delightful Picnic"},
    { title: "Friday Night @ the Roller Rink"},
    { title: "Flash light tag"}
  ];

  //First delete all events then create the new ones
  Event.deleteMany({}, (err, data) => {

    Event.create(sampleEvents, (err, data) => {
      console.log("-------- Created Event --------")
      console.log(data);
      console.log("-------- %%%%%%%%%%%%% --------")

      mongoose.connection.close();
    })

  })

});