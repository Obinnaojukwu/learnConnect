const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    try {
        token = req.headers.authorization.split(' ')[1]; // Extract token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT

        // Find user in the database
        const user = await findUserById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

// ✅ Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
