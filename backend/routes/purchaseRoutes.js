const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { protect } = require('../middleware/authMiddleware'); // Protect routes

// ✅ Route to record a purchase (User must be logged in)
router.post('/save', protect, (req, res) => {
    const userId = req.user.id; // Get userId from token (secure)
    const { audioId } = req.body;

    if (!audioId) {
        return res.status(400).json({ error: 'Audio ID is required.' });
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

// ✅ Route to check if a user has purchased a specific audio
router.get('/check/:audioId', protect, (req, res) => {
    const userId = req.user.id; // Get userId from token (secure)
    const { audioId } = req.params; // Get audio ID from URL params

    if (!audioId) {
        return res.status(400).json({ error: 'Audio ID is required.' });
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
            res.status(404).json({ success: false, message: 'You have not purchased this audio.' });
        }
    });
});

// ✅ Route to get all purchases of a user
router.get('/my-purchases', protect, (req, res) => {
    const userId = req.user.id; // Get userId from token (secure)

    const query = `SELECT * FROM purchases WHERE userId = ?`;
    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.error('Error fetching user purchases:', err.message);
            return res.status(500).json({ error: 'Failed to fetch purchases.' });
        }

        res.status(200).json({ success: true, purchases: rows });
    });
});

module.exports = router;
