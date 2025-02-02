const db = require('../config/database');

const createFaculty = (faculty, callback) => {
  const { name } = faculty;
  const query = 'INSERT INTO faculties (name) VALUES (?)';
  db.run(query, [name], function(err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, ...faculty });
  });
};

const findAllFaculties = (callback) => {
  const query = 'SELECT * FROM faculties';
  db.all(query, [], callback);
};

module.exports = { createFaculty, findAllFaculties };