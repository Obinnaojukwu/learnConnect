const { findUserById, updateUser, searchUsersInDB } = require('../models/userModel');

// Get user profile
exports.getUserProfile = (req, res) => {
    findUserById(req.user.id, (err, user) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            _id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            bio: user.bio,
            uniqueId: user.uniqueId,
        });
    });
};

// Update user profile
exports.updateUserProfile = (req, res) => {
    console.log("updateUserProfile called"); // Debug log
    findUserById(req.user.id, (err, user) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.bio = req.body.bio || user.bio;
        if (req.file) {
            console.log("File uploaded:", req.file); // Debug log
            user.profileImage = req.file.path;
        }

        updateUser(user, (err, updatedUser) => {
            if (err) return res.status(500).json({ message: err.message });

            console.log("User updated:", updatedUser); // Debug log
            res.json({
                _id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                profileImage: updatedUser.profileImage,
                bio: updatedUser.bio,
                uniqueId: updatedUser.uniqueId,
            });
        });
    });
};

// Search users
exports.searchUsers = (req, res) => {
    const searchQuery = req.query.q || '';

    searchUsersInDB(searchQuery, (err, users) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ success: true, users });
    });
};