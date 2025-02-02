const db = require('../config/database');

// Handler to get audios by course IDs
exports.getAudiosByCourseId = (req, res) => {
  const { courseId } = req.params;

  // Validate the courseId to ensure it is a number
  const numericCourseId = parseInt(courseId, 10);
  if (isNaN(numericCourseId)) {
    return res.status(400).json({ message: 'Invalid courseId. It must be a number.' });
  }

  console.log(`Fetching audios for course ID: ${numericCourseId}`);
  const query = `SELECT * FROM audios WHERE courseId = ?`;

  db.all(query, [numericCourseId], (err, rows) => {
    if (err) {
      console.error('Error fetching audios:', err.message);
      return res.status(500).json({ message: 'Error fetching audios' });
    } else {
      return res.json(rows);
    }
  });
};

// Example handler to create a new audio record
exports.createAudio = (req, res) => {
  const { title, url, courseId } = req.body;
  const query = `INSERT INTO audios (title, url, courseId) VALUES (?, ?, ?)`;

  db.run(query, [title, url, courseId], function (err) {
    if (err) {
      console.error('Error creating audio:', err.message);
      return res.status(500).json({ message: 'Error creating audio' });
    } else {
      return res.status(201).json({ message: 'Audio created successfully', id: this.lastID });
    }
  });
};