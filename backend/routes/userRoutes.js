const express = require('express');
const multer = require('multer');
const { getUserProfile, updateUserProfile, searchUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Route to get user profile
router.get('/profile', protect, getUserProfile);

// Route to update user profile
router.put('/profile', protect, upload.single('profileImage'), updateUserProfile);

// Route to search users
router.get('/search', searchUsers);

module.exports = router;