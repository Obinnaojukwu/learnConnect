const express = require('express');
const router = express.Router();
require('dotenv').config();
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Webhook Endpoint
router.post('/webhook', express.json(), (req, res) => {
  const secret = req.headers['x-paystack-signature'];

  // Verify Paystack signature (optional but recommended)
  // You can use any hash verification method you prefer

  const { event, data } = req.body;

  if (event === 'charge.success') {
    const reference = data.reference;
    const userId = data.metadata.userId;
    const audioId = data.metadata.audioId;

    // Verify payment and save purchase record to the database
    // Similar to the verify endpoint logic
    // Example: update database to mark payment as successful
  }

  res.sendStatus(200);
});

module.exports = router;