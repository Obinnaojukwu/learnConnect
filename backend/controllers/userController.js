const { findUserById, updateUser, searchUsersInDB } = require('../models/userModel');

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
            isAdmin: user.isAdmin,
        });
    });
};

exports.updateUserProfile = (req, res) => {
    findUserById(req.user.id, (err, user) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.bio = req.body.bio || user.bio;
        if (req.file) {
            user.profileImage = req.file.path;
        }

        updateUser(user, (err, updatedUser) => {
            if (err) return res.status(500).json({ message: err.message });

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

exports.searchUsers = (req, res) => {
    const searchQuery = req.query.q || '';

    searchUsersInDB(searchQuery, (err, users) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ success: true, users });
    });
};