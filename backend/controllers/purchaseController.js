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
    const { audioId, plan } = req.body;
    const userId = req.user.id;  // Get the user ID from the authenticated user

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

    const query = 'INSERT INTO purchases (audioId, userId, plan, expirationDate) VALUES (?, ?, ?, ?)';
    db.run(query, [audioId, userId, plan, expirationDate], function(err) {
        if (err) {
            console.error('Error adding purchase:', err);
            return res.status(500).json({ error: 'Failed to add purchase' });
        }
        res.status(201).json({ success: true, purchaseId: this.lastID });
    });
};

module.exports = { fetchPurchasedAudios, addPurchase };