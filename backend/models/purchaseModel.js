const db = require('../config/database');

const createPurchase = (purchase, callback) => {
  const { userId, audioId } = purchase;
  const query = 'INSERT INTO purchases (userId, audioId) VALUES (?, ?)';
  db.run(query, [userId, audioId], function(err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, ...purchase });
  });
};

const findPurchasesByUser = (userId, callback) => {
  const query = 'SELECT * FROM purchases WHERE userId = ?';
  db.all(query, [userId], callback);
};

module.exports = { createPurchase, findPurchasesByUser };