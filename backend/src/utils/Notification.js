const nodemailer = require("nodemailer")
require('dotenv').config();

const notify = async (req) => {
console.log(req.body);
    const client = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.sendMail,
        pass: process.env.Sendpassword,
      },
    });
    const info = await client.sendMail({
      from:process.env.sendMail,
      to: req.body.email,
      subject: "New Journal Published",
      text: `The code for your password change is: ${otp}`,
    });

    // res.json({ status: info, code: otp, email: req.body.email });
  };

  module.exports = notify;