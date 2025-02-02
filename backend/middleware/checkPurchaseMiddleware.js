const db = require('../config/database');

const checkPurchaseMiddleware = (req, res, next) => {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const audioId = req.params.audioId;

    const query = `SELECT * FROM purchases WHERE userId = ? AND audioId = ?`;
    db.get(query, [userId, audioId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!row) {
            return res.status(403).json({ error: 'You need to purchase this audio to access it' });
        }
        next();
    });
};

module.exports = checkPurchaseMiddleware;