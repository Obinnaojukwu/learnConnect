require('dotenv').config(); // Load .env file

const nodemailer = require('nodemailer'); // Import Nodemailer

console.log("EMAIL_USER:", process.env.EMAIL_USER); // Debugging
console.log("EMAIL_PASS:", process.env.EMAIL_PASS); // Debugging

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'isabelleray96@gmail.com',
  subject: 'Test Email',
  text: 'Hello, this is a test email!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
