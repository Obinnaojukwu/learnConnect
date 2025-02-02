const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Ensure the path is correct

// Route to record a purchase
router.post('/purchase', (req, res) => {
    const { userId, audioId } = req.body;

    if (!userId || !audioId) {
        return res.status(400).json({ error: 'User ID and Audio ID are required.' });
    }

    const query = `INSERT INTO purchases (userId, audioId) VALUES (?, ?)`;
    db.run(query, [userId, audioId], function(err) {
        if (err) {
            console.error('Error inserting purchase record:', err.message);
            return res.status(500).json({ error: 'Failed to record purchase.' });
        }
        res.status(200).json({ success: true, purchaseId: this.lastID });
    });
});

// Route to check if a purchase exists
router.get('/check', (req, res) => {
    const { userId, audioId } = req.query;

    if (!userId || !audioId) {
        return res.status(400).json({ error: 'User ID and Audio ID are required.' });
    }

    const query = `SELECT * FROM purchases WHERE userId = ? AND audioId = ?`;
    db.get(query, [userId, audioId], (err, row) => {
        if (err) {
            console.error('Error checking purchase record:', err.message);
            return res.status(500).json({ error: 'Failed to check purchase.' });
        }

        if (row) {
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ success: false });
        }
    });
});

module.exports = router;