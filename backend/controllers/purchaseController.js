const { getPurchasedAudios } = require('../models/purchaseModel');
const db = require('../config/database');

const fetchPurchasedAudios = async (req, res) => {
    const userId = req.user.id;

    console.log(`User ID received: ${userId}`);  // Log the received user ID

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const audios = await getPurchasedAudios(userId);
        console.log('Fetched audios:', audios);  // Log the fetched audios
        res.json({ success: true, audios });
    } catch (error) {
        console.error("Error fetching purchased audios:", error);
        res.status(500).json({ error: "Failed to fetch audios" });
    }
};

const addPurchase = (req, res) => {
  const { audioId, purchaseDate } = req.body;
  const userId = req.user.id;  // Get the user ID from the authenticated user

  const query = 'INSERT INTO purchases (audioId, userId, purchaseDate) VALUES (?, ?, ?)';
  db.run(query, [audioId, userId, purchaseDate], function(err) {
    if (err) {
      console.error('Error adding purchase:', err);
      return res.status(500).json({ error: 'Failed to add purchase' });
    }
    res.status(201).json({ success: true, purchaseId: this.lastID });
  });
};

module.exports = { fetchPurchasedAudios, addPurchase };