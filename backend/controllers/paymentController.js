const paystack = require('../config/paystack');
const db = require('../config/database'); // Use your existing database connection

// Initialize a transaction
const initializeTransaction = async (req, res) => {
  const { amount, email, metadata, callback_url } = req.body; // Include callback_url in the request body

  try {
    const response = await paystack.transaction.initialize({
      amount: amount * 100, // Paystack expects amount in kobo (smallest currency unit)
      email,
      metadata,
      callback_url // Pass the callback URL to Paystack
    });

    res.json({ authorization_url: response.data.authorization_url });
  } catch (error) {
    console.error('Error initializing transaction:', error);
    res.status(500).json({ error: error.message });
  }
};

// Verify transaction
const verifyTransaction = async (req, res) => {
  const { reference, userId, audioId, plan, testMode } = req.body; // Added testMode

  try {
    if (testMode) {
      // Simulate a successful payment verification
      console.log('Test mode enabled, simulating payment verification...');
      return handleSuccessfulVerification(userId, audioId, plan, res);
    }

    const response = await paystack.transaction.verify({ reference });

    console.log('Payment verification response:', response.data); // Log response from Paystack

    if (response.data.status === 'success') {
      return handleSuccessfulVerification(userId, audioId, plan, res);
    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Error verifying transaction:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const handleSuccessfulVerification = (userId, audioId, plan, res) => {
  const paymentDate = new Date().toISOString();
  const status = 'completed';

  // Calculate the expiration date based on the selected plan
  let expirationDate = new Date();
  if (plan === '1_week') {
    expirationDate.setDate(expirationDate.getDate() + 7); // Set to 1 week
  } else if (plan === '1_month') {
    expirationDate.setMonth(expirationDate.getMonth() + 1);
  } else if (plan === '3_months') {
    expirationDate.setMonth(expirationDate.getMonth() + 3);
  }
  expirationDate = expirationDate.toISOString();

  const query = `INSERT INTO purchases (userId, audioId, plan, expirationDate) VALUES (?, ?, ?, ?)`;
  db.run(query, [userId, audioId, plan, expirationDate], function (err) {
    if (err) {
      console.error('Error adding purchase:', err); // Log error if any
      return res.status(500).json({ message: err.message });
    }
    console.log('Purchase recorded successfully:', this.lastID); // Log success message
    res.json({ success: true, paymentId: this.lastID });
  });
};

module.exports = {
  initializeTransaction,
  verifyTransaction,
};