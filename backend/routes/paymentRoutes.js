const express = require('express');
const router = express.Router();
const { initializeTransaction, verifyTransaction } = require('../controllers/paymentController');

// Route to initialize a transaction
router.post('/initialize', initializeTransaction);

// Route to verify a transaction
router.post('/verify', verifyTransaction);

module.exports = router;
