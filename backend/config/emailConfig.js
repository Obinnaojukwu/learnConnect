require('dotenv').config(); // Ensure .env file is loaded

const nodemailer = require('nodemailer');

// Log environment variables for debugging
console.log('Email Username:', process.env.EMAIL_USERNAME);
console.log('Email Password:', process.env.EMAIL_PASSWORD ? 'Loaded' : 'Not Loaded');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = transporter;