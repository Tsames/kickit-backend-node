const passwordResetEmail = (email, link) => {

  const output = {
    from: 'no-reply"" <no-reply@kick-it.live>', // sender address
    to: `${email}`, // list of receivers
    subject: "Reset your password for Kick-it", // Subject line
    text: `${link}`, // plain text body
    html: "<b>Hello world?</b>", // html body
  }

  return output;
}

module.exports = passwordResetEmail;