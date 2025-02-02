const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

console.log('registerUser:', registerUser); // Add this line
console.log('loginUser:', loginUser); // Add this line

// Define the routes for registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;