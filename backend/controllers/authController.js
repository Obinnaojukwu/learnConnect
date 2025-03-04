require('dotenv').config(); // Ensure .env file is loaded

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');
const sendWelcomeEmail = require('../utils/emailService');
const validateEmail = require('../utils/emailValidator');

// Log environment variables for debugging
console.log('Email Username (in authController):', process.env.EMAIL_USERNAME);
console.log('Email Password (in authController):', process.env.EMAIL_PASSWORD ? 'Loaded' : 'Not Loaded');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate email
  const isEmailValid = await validateEmail(email);
  if (!isEmailValid) {
    console.warn('Email validation failed, proceeding with registration.');
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  createUser({ name, email, password: hashedPassword }, (err, user) => {
    if (err) return res.status(500).send({ message: 'Error registering user.' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });

    // Send welcome email regardless of email validation result
    sendWelcomeEmail(user.email, user.name);

    res.status(200).send({ token });
  });
};

// User login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
    res.status(200).send({ token });
  });
};