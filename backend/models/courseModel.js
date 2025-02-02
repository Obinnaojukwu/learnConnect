const db = require('../config/database');

const createCourse = (course, callback) => {
  const { facultyId, name } = course;
  const query = 'INSERT INTO courses (facultyId, name) VALUES (?, ?)';
  db.run(query, [facultyId, name], function(err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, ...course });
  });
};

const findCoursesByFaculty = (facultyId, callback) => {
  const query = 'SELECT * FROM courses WHERE facultyId = ?';
  db.all(query, [facultyId], callback);
};

module.exports = { createCourse, findCoursesByFaculty };