require('dotenv').config(); // Ensure .env file is loaded

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { createUser, findUserByEmail, updateUser } = require('../models/userModel');
const sendWelcomeEmail = require('../utils/emailService');
const sendResetCodeEmail = require('../utils/resetCodeEmailService');
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

// Send reset code
exports.sendResetCode = async (req, res) => {
  const { email } = req.body;

  findUserByEmail(email, (err, user) => {
    if (err || !user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const resetCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    user.resetCode = resetCode;

    updateUser(user, (updateErr) => {
      if (updateErr) {
        return res.status(500).send({ message: 'Error saving reset code.' });
      }

      console.log('Reset code saved to user:', user.resetCode); // Log the saved reset code
      sendResetCodeEmail(user.email, resetCode);
      res.status(200).send({ message: 'Reset code sent to email.' });
    });
  });
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { email, resetCode, newPassword } = req.body;

  console.log('Received reset password request:', req.body); // Log the incoming request payload

  findUserByEmail(email, (err, user) => {
    if (err || !user) {
      console.error('User not found or error occurred:', err); // Log error details
      return res.status(400).send({ message: 'Invalid email or user not found.' });
    }

    console.log('User found:', user); // Log user details
    console.log('Stored reset code:', user.resetCode); // Log stored reset code
    console.log('Provided reset code:', resetCode); // Log provided reset code

    if (user.resetCode !== resetCode) {
      console.error('Invalid reset code:', resetCode); // Log error details
      return res.status(400).send({ message: 'Invalid reset code.' });
    }

    user.password = bcrypt.hashSync(newPassword, 8);
    user.resetCode = null; // Clear the reset code after successful password reset

    updateUser(user, (updateErr) => {
      if (updateErr) {
        console.error('Error updating user password', updateErr); // Log error details
        return res.status(500).send({ message: 'Error resetting password.' });
      }

      console.log('Password reset successfully for user:', user.email); // Log success
      res.status(200).send({ message: 'Password reset successfully.' });
    });
  });
};