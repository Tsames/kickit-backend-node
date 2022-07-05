//Dependencies
const mongoose = require("mongoose");
const Event = require("./event");

mongoose.connection.on("open", () => {

  //Create sample potential dates
  const now = new Date(Date.now());
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);

  function makeNewDate(moreDays) {
    const newDate = new Date(now);
    newDate.setDate(newDate.getDate() + moreDays);
    return newDate.getTime();
  }

  const dateOne = makeNewDate(1);
  const dateTwo = makeNewDate(2);
  const dateThree = makeNewDate(3);
  const dateFour = makeNewDate(4);
  const dateFive = makeNewDate(5);
  const dateSix = makeNewDate(6);
  const dateSeven = makeNewDate(7);
  const dateEight = makeNewDate(8);
  const dateNine = makeNewDate(9);
  const dateTen = makeNewDate(10);
  const dateEleven = makeNewDate(11);

  //Create Sample Attending Data
  const attendingEventOne = [{name: "Tom", available: [[1,1,1],[1,1,2],[1,1,3]]}, {name: "Evelyn", available: [[1,1,3]]}, {name: "Martha", available: [[1,1,1], [1,1,2], [1,1,3]]}];

  //Create sample event data
  const sampleEvents = [
    {title: "Delightful Picnic", location: "Greer Park", description: "Come down to Greer Park and enjoy a delightful picnic in the afternoon sun. The weather is just so delightful this time of year. Make sure you bring something to share with everyone!", early: 1, late: 24, days: [dateOne, dateTwo, dateThree, dateFive, dateSix, dateSeven, dateEight, dateTen, dateEleven], attending: attendingEventOne},
    { title: "Friday Night Jam at the Roller Rink", location: "Mojo's Party Rink", description: "Get ready to groove out on the roller rink! We're trying to get as many people as we can to attend! Come join us, its gonna be awesome!", early: 18, late: 24, days: [dateThree, dateFour, dateEight, dateEleven]},
    { title: "Frozen Pizza Party", location: "Andreas' house", description: "We're celebrating andreas' birthday with his request. A little strange but we promise once you try it you'll find you really like it!", early: 14, late: 20, days: [dateSeven, dateNine, dateTen]}
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