const express = require('express');
const { uploadAudioFile, purchaseAudio } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../utils/saveFile');
const router = express.Router();

router.route('/audio')
    .post(protect, admin, upload.single('file'), uploadAudioFile);

router.post('/purchase/:audioId', protect, purchaseAudio);

module.exports = router;