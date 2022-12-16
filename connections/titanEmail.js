// ---------- Dependencies ----------
require("dotenv").config({ path: '../.env' });
const nodemailer = require("nodemailer");

async function main() {

  console.log(process.env.EMAIL_HOST);
  console.log(process.env.EMAIL_PASSWORD);

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

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'no-reply"" <no-reply@kick-it.live>', // sender address
    to: "tsames1@gmail.com", // list of receivers
    subject: "Hello this is a test", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou..
}

main().catch(console.error)