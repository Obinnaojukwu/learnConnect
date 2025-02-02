const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite'); // Use a persistent database

// Create the payments table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    courseId INTEGER NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL,
    paymentDate TEXT NOT NULL
  )`);
});

module.exports = db;