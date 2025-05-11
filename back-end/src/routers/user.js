const express = require('express');
const router = express.Router();
const { Users } = require('../models/user');
const authMiddleware = require('../middleware/auth');
const bcrypt = require('bcrypt');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await Users.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user profile',
            error: error.message
        });
    }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Check if email or phone is already taken by another user
        const existingUser = await Users.findOne({
            $or: [{ email }, { phone }],
            _id: { $ne: req.user.userId }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email or phone number already in use'
            });
        }

        const user = await Users.findByIdAndUpdate(
            req.user.userId,
            { name, email, phone },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
});

// Change password
router.put('/change-password', authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await Users.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error changing password',
            error: error.message
        });
    }
});

// Delete user account
router.delete('/account', authMiddleware, async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.user.userId);
        res.json({
            success: true,
            message: 'Account deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting account',
            error: error.message
        });
    }
});

module.exports = router; 