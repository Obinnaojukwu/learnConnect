const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const db = require('../config/database');

// Initialize Payment
router.post('/initialize', async (req, res) => {
  const { amount, email, metadata } = req.body;

  try {
    console.log('Initializing payment with data:', { amount, email, metadata });

    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      amount: amount * 100, // Paystack expects amount in kobo
      email,
      metadata: {
        ...metadata,
        callback_url: 'https://learnconnect-frontend.onrender.com/payment-success' // Set your callback URL here
      }
    }, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    });

    console.log('Paystack response:', response.data);

    const { authorization_url } = response.data.data;
    res.json({ authorization_url });
  } catch (error) {
    if (error.response) {
      console.error('Error response from Paystack:', error.response.data);
      res.status(500).json({ error: error.response.data.message });
    } else if (error.request) {
      console.error('No response received from Paystack:', error.request);
      res.status(500).json({ error: 'No response from Paystack' });
    } else {
      console.error('Error in setting up the request to Paystack:', error.message);
      res.status(500).json({ error: 'Payment initialization error' });
    }
  }
});

// Verify Payment
router.post('/verify', async (req, res) => {
  const { reference, userId, audioId, plan } = req.body;

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    });

    if (response.data.data.status === 'success') {
      // Calculate expiration date based on the selected plan
      let expirationDate = new Date();
      if (plan === '10_minutes') {
        expirationDate.setMinutes(expirationDate.getMinutes() + 10);
      } else if (plan === '1_month') {
        expirationDate.setMonth(expirationDate.getMonth() + 1);
      } else if (plan === '3_months') {
        expirationDate.setMonth(expirationDate.getMonth() + 3);
      }
      expirationDate = expirationDate.toISOString();

      // Save purchase record to the database
      const query = `INSERT INTO purchases (userId, audioId, plan, expirationDate) VALUES (?, ?, ?, ?)`;
      db.run(query, [userId, audioId, plan, expirationDate], function (err) {
        if (err) {
          console.error('Error saving purchase record:', err.message);
          return res.status(500).json({ error: 'Failed to save purchase record' });
        }
        res.json({ success: true });
      });
    } else {
      res.status(400).json({ error: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification error' });
  }
});

module.exports = router;