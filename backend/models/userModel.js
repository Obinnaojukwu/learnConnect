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
  const query = 'SELECT id, name, username, email, profileImage, bio, uniqueId, password FROM users WHERE id = ?';
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
  db.get(query, [email], (err, user) => {
    if (err) {
      console.error("Database error:", err);
      return callback(err);
    }

    if (!user) {
      console.warn("User not found for email:", email);
      return callback(null, null);
    }

    console.log("User fetched from DB:", user); // Debugging log
    callback(null, user);
  });
};

const updateUser = (user, callback) => {
  const { id, username, email, bio, profileImage, resetCode, password } = user;
  const query = 'UPDATE users SET username = ?, email = ?, bio = ?, profileImage = ?, resetCode = ?, password = ? WHERE id = ?';
  db.run(query, [username, email, bio, profileImage, resetCode, password, id], function(err) {
    if (err) return callback(err);
    callback(null, user);
  });
};

const searchUsersInDB = (searchQuery, callback) => {
  const query = `
    SELECT id, name, username, profileImage
    FROM users
    WHERE name LIKE ? OR username LIKE ?
  `;
  const params = [`%${searchQuery}%`, `%${searchQuery}%`];
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return callback(err);
    }
    callback(null, rows);
  });
};

module.exports = { createUser, findUserById, findUserByEmail, updateUser, searchUsersInDB };