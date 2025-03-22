const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDirectory = path.resolve(__dirname, 'database');
const dbPath = path.join(dbDirectory, 'learnconnect_new1.db');

// Ensure the directory for the database file exists
if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory, { recursive: true });
}

// Ensure the database file exists or create it
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '');
}

// Log the current directory and database path for debugging
console.log('Current directory:', dbDirectory);
console.log('Database path:', dbPath);

// Initialize the SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        console.error('Database path:', dbPath);
    } else {
        console.log('Connected to the SQLite database.');

        db.serialize(() => {
            // USERS TABLE
            db.run(
                `CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    username TEXT,
                    profileImage TEXT,
                    bio TEXT,
                    uniqueId TEXT,
                    isAdmin BOOLEAN DEFAULT 0
                );`,
                (err) => {
                    if (err) {
                        console.error("❌ Error creating users table:", err.message);
                    } else {
                        console.log("🟢 Users table ensured.");
                    }
                }
            );

            // AUDIOS TABLE
            db.run(
                `CREATE TABLE IF NOT EXISTS audios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    courseId TEXT NOT NULL,
                    title TEXT NOT NULL,
                    url TEXT NOT NULL,
                    uploadedBy TEXT NOT NULL,
                    level TEXT NOT NULL, 
                    FOREIGN KEY(uploadedBy) REFERENCES users(id)
                );`,
                (err) => {
                    if (err) {
                        console.error("❌ Error creating audios table:", err.message);
                    } else {
                        console.log("🟢 Audios table ensured.");
                    }
                }
            );

            // PURCHASES TABLE
            db.run(
                `CREATE TABLE IF NOT EXISTS purchases (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    userId INTEGER NOT NULL,
                    audioId INTEGER NOT NULL,
                    plan TEXT NOT NULL,
                    expirationDate DATETIME NOT NULL,
                    FOREIGN KEY(userId) REFERENCES users(id),
                    FOREIGN KEY(audioId) REFERENCES audios(id)
                );`,
                (err) => {
                    if (err) {
                        console.error("❌ Error creating purchases table:", err.message);
                    } else {
                        console.log("🟢 Purchases table ensured.");
                    }
                }
            );

            // FACULTIES TABLE
            db.run(
                `CREATE TABLE IF NOT EXISTS faculties (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL
                );`,
                (err) => {
                    if (err) {
                        console.error("❌ Error creating faculties table:", err.message);
                    } else {
                        console.log("🟢 Faculties table ensured.");
                    }
                }
            );

            // COURSES TABLE
            db.run(
                `CREATE TABLE IF NOT EXISTS courses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    facultyId INTEGER NOT NULL,
                    name TEXT NOT NULL,
                    FOREIGN KEY(facultyId) REFERENCES faculties(id)
                );`,
                (err) => {
                    if (err) {
                        console.error("❌ Error creating courses table:", err.message);
                    } else {
                        console.log("🟢 Courses table ensured.");
                    }
                }
            );

            // FRIENDS TABLE
            db.run(
                `CREATE TABLE IF NOT EXISTS friends (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    userId INTEGER NOT NULL,
                    friendId INTEGER NOT NULL,
                    FOREIGN KEY(userId) REFERENCES users(id),
                    FOREIGN KEY(friendId) REFERENCES users(id)
                );`,
                (err) => {
                    if (err) {
                        console.error("❌ Error creating friends table:", err.message);
                    } else {
                        console.log("🟢 Friends table ensured.");
                    }
                }
            );

            // MESSAGES TABLE
            db.run(
                `CREATE TABLE IF NOT EXISTS messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    senderId INTEGER NOT NULL,
                    receiverId INTEGER NOT NULL,
                    message TEXT NOT NULL,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(senderId) REFERENCES users(id),
                    FOREIGN KEY(receiverId) REFERENCES users(id)
                );`,
                (err) => {
                    if (err) {
                        console.error("❌ Error creating messages table:", err.message);
                    } else {
                        console.log("🟢 Messages table ensured.");
                    }
                }
            );
        });
    }
});

// Export the database connection
module.exports = db;