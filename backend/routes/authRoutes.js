const express = require('express');
const { registerUser, loginUser, sendResetCode, resetPassword } = require('../controllers/authController');
const router = express.Router();

console.log('registerUser:', registerUser); // Add this line
console.log('loginUser:', loginUser); // Add this line
console.log('sendResetCode:', sendResetCode); // Add this line
console.log('resetPassword:', resetPassword); // Add this line

// Define the routes for registration, login, sending reset code, and resetting password
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-reset-code', sendResetCode);
router.post('/reset-password', resetPassword);

module.exports = router;