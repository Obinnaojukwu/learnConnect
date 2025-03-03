const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const axios = require('axios');
const { createUser, findUserByEmail } = require('../models/userModel');
require('dotenv').config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send a welcome email
const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Our Platform!',
    html: `<h1>Welcome, ${name}!</h1><p>Thank you for signing up. We're excited to have you on board!</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Error sending email:', err.message);
  }
};

// Function to verify email using ZeroBounce API
const verifyEmail = async (email) => {
  try {
    const response = await axios.get(
      `https://api.zerobounce.net/v2/validate?api_key=${process.env.EMAIL_API_KEY}&email=${email}`
    );

    console.log('📩 Email verification response:', response.data);

    return response.data.status === 'valid';
  } catch (error) {
    console.error('❌ Email verification failed:', error.message);
    return false;
  }
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate email format
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).send({ message: 'Invalid email format.' });
    }

    // Verify email using ZeroBounce
    const isEmailValid = await verifyEmail(email);
    if (!isEmailValid) {
      return res.status(400).send({ message: 'Invalid email address. Please use a real email.' });
    }

    // Check if user already exists
    findUserByEmail(email, async (err, existingUser) => {
      if (existingUser) {
        return res.status(400).send({ message: 'Email is already registered.' });
      }

      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 8);

      // Create new user
      createUser({ name, email, password: hashedPassword }, async (err, user) => {
        if (err) return res.status(500).send({ message: 'Error registering user.' });

        // Send welcome email after successful registration
        await sendWelcomeEmail(email, name);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
        res.status(201).send({ token });
      });
    });
  } catch (error) {
    console.error('❌ Error in registerUser:', error);
    res.status(500).send({ message: 'Internal server error.' });
  }
};

// User login
exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    findUserByEmail(email, (err, user) => {
      if (err || !user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send({ message: 'Invalid email or password.' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
      res.status(200).send({ token });
    });
  } catch (error) {
    console.error('❌ Error in loginUser:', error);
    res.status(500).send({ message: 'Internal server error.' });
  }
};
