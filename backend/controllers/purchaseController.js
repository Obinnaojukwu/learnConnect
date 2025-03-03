const { savePurchase } = require('../models/purchaseModel');

exports.recordPurchase = (req, res) => {
    const userId = req.user.id; // Get logged-in user's ID
    const { audioId } = req.body; // Get audio ID from request

    if (!audioId) {
        return res.status(400).json({ message: 'Audio ID is required' });
    }

    savePurchase({ userId, audioId }, (err, purchase) => {
        if (err) return res.status(500).json({ message: 'Error saving purchase' });

        res.json({ success: true, message: 'Purchase recorded', purchase });
    });
};
