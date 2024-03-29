// ---------- Dependencies ----------

require("dotenv").config({ path: '../.env' });

const express = require('express');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const transporter = require("../connections/titanEmail.js");

const confirmAccountEmail = require('./../emails/confirmAccountEmail');
const passwordResetEmail = require('./../emails/passwordResetEmail');

// ---------- Create User Router ----------

const userRouter = express.Router();

// ---------- Middleware ----------


// ---------- User Router ----------

/* &%&%&%&%&%& Create Token and Email (Signup 1) &%&%&%&%&%& */

userRouter.post('/signup', async (req, res) => {

  const { name, email, password } = req.body;

  try {

    //Check if user already exists
    const findExistingUser = await User.findOne({ email: email });

    //If user already exists, then res.send error
    if (findExistingUser) {

      res.status(400).json({ message: "That user already exists. Try logging in with the provided email address." })

    //Else create a new user but do not save it. Send confirmation email with jwt token.
    } else {

      const newUser = {
        name: name,
        email: email,
        password: password
      };

      //Create a new secret that is unique to each individual user
      const secret = process.env.ACCESS_TOKEN_SECRET + email;

      //Create a new JWT token with the a secret unique to each user that expires in 1 day
      const token = jwt.sign(newUser, secret, { expiresIn: '30m' });

      //Create a unique link from that temporary token
      const link = `http://localhost:3000/users/confirm-account/${email}/${token}`

      //Send email to user via the transporter object
      // let info = await transporter.sendMail(confirmAccountEmail(newUser.email, link));

      res.status(200).json(link);
    }

  } catch (error) {

    res.status(400).json({ message: error.message })

  }
})

/* &%&%&%&%&%& Verify Email (Signup 2) &%&%&%&%&%& */

userRouter.get('/confirm-account/:email/:token', async (req, res) => {

  try {

    //Get jwt token from params & declare temp variable
    const { email, token } = req.params;
    let user;

    //Reassemble the secret that is unique to each individual user
    const secret = process.env.ACCESS_TOKEN_SECRET + email;

    //Verify token and extract data into temp variable
    jwt.verify(token, secret, (err, data) => {
      if (err) return res.sendStatus(403);
      user = data;
    });

    //Hash password data
    const hash = await brcypt.hash(user.password, 13)

    //Create new user from token data and hashed password
    const newUser =  new User ({
      name: user.name,
      email: user.email,
      password: hash
    });

    //Save new user
    const savedUser = await newUser.save();

    res.status(200).json({ message: "User created.", payload: savedUser })

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

/* &%&%&%&%&%& Generate Token and Link (Password Reset 1) &%&%&%&%&%& */

userRouter.post("/reset-password", async (req, res) => {

  const email = req.body.email;

  try {

    //Check if user exists
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      res.send(`There is no account associated with the provided email address: ${email}.`)
    }
    
    //Create a new secret that is unique to each individual user
    const secret = process.env.ACCESS_TOKEN_SECRET + existingUser.id;

    //Create the payload
    const payload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email
    }

    //Create a new JWT token with the a secret unique to each user that expires in 30 minutes
    const token = jwt.sign(payload, secret, {expiresIn: '30m'});

    //Create a unique link from that temporary token
    const link = `http://localhost:3000/users/reset-password/${existingUser.id}/${token}`

    //Send email to user via the transporter object
    // let info = await transporter.sendMail(passwordResetEmail);

    res.send(link);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }
});

/* &%&%&%&%&%& Verify Token and Change Password (Password Reset 2) &%&%&%&%&%& */

userRouter.post("/reset-password/:id/:token", async (req, res) => {

  try {

    //Get id and jwt token from params & declare temp variable to hold jwt payload
    const { id, token } = req.params;
    let user;

    //Recreate Secret Key
    const secret = process.env.ACCESS_TOKEN_SECRET + id;

    //Verify token and extract data into temp variable
    jwt.verify(token, secret, (err, data) => {
      if (err) return res.sendStatus(403);
      user = data;
    });

    //Get new password data and hash it
    const password = req.body.password;
    const hash = await brcypt.hash(password, 13)

    //Update user password
    const updatedUser = await User.findOneAndUpdate({ email: user.email }, { password: hash}, { new: true });

    //Send confirmation to client that token is valid
    res.status(200).json(updatedUser);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }
});


// ---------- Export Router ----------

module.exports = userRouter;

///////////////////////////////////////