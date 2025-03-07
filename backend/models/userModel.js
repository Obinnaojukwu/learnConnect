const db = require('../config/database');

const createUser = (user, callback) => {
  const { name, email, password, username, profileImage, bio, uniqueId, isAdmin } = user;
  const query = 'INSERT INTO users (name, email, password, username, profileImage, bio, uniqueId, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.run(query, [name, email, password, username, profileImage, bio, uniqueId, isAdmin], function(err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, ...user });
  });
};

const findUserById = (id, callback) => {
  const query = 'SELECT id, name, username, email, profileImage, bio, uniqueId FROM users WHERE id = ?';
  db.get(query, [id], (err, user) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err);
    }

    if (!user) {
      console.warn("User not found for ID:", id);
      return callback(null, null);
    }

    console.log("User fetched from DB:", user); // Debugging log
    callback(null, user);
  });
};

const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.get(query, [email], callback);
};

module.exports = { createUser, findUserById, findUserByEmail };