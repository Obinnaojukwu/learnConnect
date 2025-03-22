const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, 'database', 'learnconnect_new1.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database for plan-based purchases.');
    }
});

const calculateExpirationDate = (plan) => {
    const currentDate = new Date();
    switch (plan) {
        case '10_minutes':
            return new Date(currentDate.getTime() + 10 * 60 * 1000); // 10 minutes
        case '1_month':
            return new Date(currentDate.setMonth(currentDate.getMonth() + 1)); // 1 month
        case '3_months':
            return new Date(currentDate.setMonth(currentDate.getMonth() + 3)); // 3 months
        default:
            throw new Error('Invalid plan');
    }
};

const purchaseAudio = (userId, audioId, plan) => {
    return new Promise((resolve, reject) => {
        const expirationDate = calculateExpirationDate(plan);

        db.run(
            `INSERT INTO purchases (userId, audioId, plan, expirationDate) VALUES (?, ?, ?, ?)`,
            [userId, audioId, plan, expirationDate.toISOString()],
            function (err) {
                if (err) {
                    return reject(err);
                }
                resolve({ purchaseId: this.lastID });
            }
        );
    });
};

module.exports = {
    purchaseAudio,
};