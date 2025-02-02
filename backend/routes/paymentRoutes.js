const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

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
        callback_url: 'https://d37e-102-88-109-184.ngrok-free.app/payment-success' // Set your ngrok callback URL here
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
  const { reference, userId, audioId } = req.body;
  
  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    });

    if (response.data.data.status === 'success') {
      // Save purchase record to the database (replace with actual database logic)
      db.run(`INSERT INTO purchases (userId, audioId) VALUES (?, ?)`,
        [userId, audioId],
        function (err) {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to save purchase record' });
          }
          res.json({ success: true });
        }
      );
    } else {
      res.status(400).json({ error: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification error' });
  }
});

module.exports = router;