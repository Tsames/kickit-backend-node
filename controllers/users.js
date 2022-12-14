// ---------- Dependencies ----------

require("dotenv").config();

const express = require('express');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

// ---------- Create User Router ----------

const userRouter = express.Router();

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

// ---------- User Router ----------

/* &%&%&%&%&%& Signup Route &%&%&%&%&%& */

userRouter.post('/signup', async (req, res) => {

  const { name, email, password } = req.body

  try {

    //Check if user already exists
    const findExistingUser = await User.findOne({ email: email });

    //If so res.send error
    if (findExistingUser) {

      res.status(400).json({ message: "That user already exists. Try logging in with the provided email address." })

    //Else try and make new user
    } else {

      const hash = await brcypt.hash(password, 13)

      const newUser = new User({
        name: name,
        email: email,
        password: hash,
      })

      const savedUser = await newUser.save();
      res.status(200).json({ message: "User created.", payload: savedUser })

    }

  } catch (error) {
    res.status(400).json({ message: error.message })
  }

})

/* &%&%&%&%&%& Login Route &%&%&%&%&%& */

userRouter.post("/login", async (req, res) => {

  const { email, password } = req.body

  try {

    const data = await User.findOne({ email: email });
    const isMatch = await brcypt.compare(password, data.password)

    if (isMatch) {

      const accessToken = jwt.sign( data.toJSON(), process.env.ACCESS_TOKEN_SECRET)
      res.status(200).json({ accessToken: accessToken });

    } else {
      res.status(401).json({ message: "Incorrect password. Please check the username and password provided and try again."})
    }

  } catch (error) {
    res.status(500).json({ message: "No account with the provided email address exists." })
  }

});

/* &%&%&%&%&%& Get Reset Password Email &%&%&%&%&%& */

userRouter.post("/forgot-password", async (req, res) => {

  const email = req.body.email;

  try {

    //Check if user exists
    const existingUser = await User.findOne({ email: email });

    //Create a new secret that is unique to each individual user
    const secret = process.env.ACCESS_TOKEN_SECRET + existingUser.id;

    //Create the payload
    const payload = {
      email: existingUser.email,
      id: existingUser.id
    }

    //Create a new JWT token with the a secret unique to each user that expires in 30 minutes
    const token = jwt.sign(payload, secret, {expiresIn: '30m'});

    //Create a unique link from that temporary token
    const link = `http://localhost:3000/reset-password/${existingUser.id}/${token}`

    res.send(link);


  } catch (error) {

    res.status(400).json({ message: error.message });

  }


});


// ---------- Export Router ----------

module.exports = userRouter;

///////////////////////////////////////