const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Endpoint to fetch chat messages between two users
router.get('/:userId/:friendId', (req, res) => {
    const { userId, friendId } = req.params;

    const sql = `
        SELECT * FROM messages
        WHERE (senderId = ? AND receiverId = ?)
        OR (senderId = ? AND receiverId = ?)
        ORDER BY timestamp ASC
    `;
    const params = [userId, friendId, friendId, userId];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error fetching messages', error: err.message });
        } else {
            res.status(200).json({ success: true, messages: rows });
        }
    });
});

module.exports = router;