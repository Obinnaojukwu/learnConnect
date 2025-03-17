const db = require('../config/database');

const getPurchasedAudios = (userId) => {
  return new Promise((resolve, reject) => {
      const query = `
          SELECT audios.id, audios.title, audios.url
          FROM purchases
          JOIN audios ON purchases.audioId = audios.id
          WHERE purchases.userId = ?;
      `;

      console.log(`Executing query: ${query} with userId: ${userId}`);  // Log the query and userId

      db.all(query, [userId], (err, rows) => {
          if (err) {
              console.error('Error executing query:', err);  // Log any query errors
              reject(err);
          } else {
              console.log('Query result:', rows);  // Log the query result
              resolve(rows);
          }
      });
  });
};

module.exports = { getPurchasedAudios };