const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { fetchPurchasedAudios, addPurchase } = require('../controllers/purchaseController');

// Route to fetch purchased audios
router.get("/purchased-audios", protect, (req, res, next) => {
  console.log('Accessing /purchased-audios route');  // Log when the route is accessed
  next();
}, fetchPurchasedAudios);

// Route to add a purchase
router.post("/", protect, (req, res, next) => {
  console.log('Accessing /api/purchases route');  // Log when the route is accessed
  next();
}, addPurchase);

module.exports = router;