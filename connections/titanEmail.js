// ---------- Dependencies ----------
require("dotenv").config({ path: '../.env' });
const nodemailer = require("nodemailer");

//Create transporter for Node Mailer Library
let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ACCOUNT, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});

//Export Transporter
module.exports = transporter