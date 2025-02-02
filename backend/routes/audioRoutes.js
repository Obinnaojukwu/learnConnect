const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/database');

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Ensure the uploads directory exists
const fs = require('fs');
const uploadsDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Endpoint to upload audio files
router.post('/upload', upload.single('audio'), (req, res) => {
  const { courseId, title, uploadedBy, level } = req.body;
  const url = `/uploads/${req.file.filename}`;

  const sql = `INSERT INTO audios (courseId, title, url, uploadedBy, level) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [courseId, title, url, uploadedBy, level], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, url });
  });
});

// Endpoint to fetch all audios
router.get('/', (req, res) => {
  const sql = `SELECT * FROM audios`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});
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

// Serve static files from the uploads directory
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = router;