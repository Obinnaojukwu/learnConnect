const paystack = require('../config/paystack');
const db = require('../models/paymentModel');

// Initialize a transaction
const initializeTransaction = async (req, res) => {
  const { amount, email, metadata } = req.body;

  try {
    const response = await paystack.transaction.initialize({
      amount: amount * 100, // Paystack expects amount in kobo (smallest currency unit)
      email,
      metadata,
    });

    res.json({ authorization_url: response.data.authorization_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify transaction
const verifyTransaction = async (req, res) => {
  const { reference, userId, audioId, plan } = req.body;

  try {
    const response = await paystack.transaction.verify({ reference });

    if (response.data.status === 'success') {
      const paymentDate = new Date().toISOString();
      const status = 'completed';

      // Calculate the expiration date based on the selected plan
      let expirationDate = new Date();
      if (plan === '10_minutes') {
        expirationDate.setMinutes(expirationDate.getMinutes() + 10);
      } else if (plan === '1_month') {
        expirationDate.setMonth(expirationDate.getMonth() + 1);
      } else if (plan === '3_months') {
        expirationDate.setMonth(expirationDate.getMonth() + 3);
      }
      expirationDate = expirationDate.toISOString();

      const query = `INSERT INTO purchases (userId, audioId, plan, expirationDate) VALUES (?, ?, ?, ?)`;
      db.run(query, [userId, audioId, plan, expirationDate], function (err) {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        res.json({ success: true, paymentId: this.lastID });
      });
    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  initializeTransaction,
  verifyTransaction,
};