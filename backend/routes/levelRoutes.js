const express = require('express');
const router = express.Router();

// Dummy data for levels
const levels = ['100', '200', '300', '400'];

router.get('/', (req, res) => {
  res.json(levels);
});

module.exports = router;