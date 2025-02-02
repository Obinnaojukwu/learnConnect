const db = require('../config/database');

const createAudio = (audio, callback) => {
  const { courseId, title, url, uploadedBy } = audio;
  const query = 'INSERT INTO audios (courseId, title, url, uploadedBy) VALUES (?, ?, ?, ?)';
  db.run(query, [courseId, title, url, uploadedBy], function(err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, ...audio });
  });
};

const findAudiosByCourse = (courseId, callback) => {
  const query = 'SELECT * FROM audios WHERE courseId = ?';
  db.all(query, [courseId], callback);
};

module.exports = { createAudio, findAudiosByCourse };