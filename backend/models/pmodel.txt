const db = require('../config/database');

const getPurchasedAudios = (userId) => {
  return new Promise((resolve, reject) => {
      const query = `
          SELECT audios.id, audios.title, audios.url, purchases.expirationDate
          FROM purchases
          JOIN audios ON purchases.audioId = audios.id
          WHERE purchases.userId = ? AND datetime('now') < datetime(purchases.expirationDate);
      `;

      console.log(`Executing query: ${query} with userId: ${userId}`);  // Log the query and userId

      db.all(query, [userId], (err, rows) => {
          if (err) {
              console.error('Error executing query:', err);  // Log any query errors
              reject(err);
          } else {
              console.log('Query result:', rows);  // Log the query result
              
              // Remove expirationDate before resolving
              const result = rows.map(row => {
                const { expirationDate, ...audioData } = row;
                return audioData;
              });

              resolve(result);
          }
      });
  });
};

module.exports = { getPurchasedAudios };