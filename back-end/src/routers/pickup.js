const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Pickup = require('../models/pickup');

// Schedule a new pickup
router.post('/schedule', authMiddleware, async (req, res) => {
    try {
        const {
            pickupDate,
            pickupTime,
            address,
            wasteType,
            quantity,
            specialInstructions
        } = req.body;

        const pickup = new Pickup({
            user: req.user.userId,
            pickupDate,
            pickupTime,
            address,
            wasteType,
            quantity,
            specialInstructions,
            status: 'scheduled'
        });

        await pickup.save();

        res.status(201).json({
            success: true,
            message: 'Pickup scheduled successfully',
            pickup
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error scheduling pickup',
            error: error.message
        });
    }
});

// Get user's pickup history
router.get('/history', authMiddleware, async (req, res) => {
    try {
        const pickups = await Pickup.find({ user: req.user.userId })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            pickups
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching pickup history',
            error: error.message
        });
    }
});

// Get pickup details
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const pickup = await Pickup.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!pickup) {
            return res.status(404).json({
                success: false,
                message: 'Pickup not found'
            });
        }

        res.json({
            success: true,
            pickup
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching pickup details',
            error: error.message
        });
    }
});

// Update pickup status
router.put('/:id/status', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        const pickup = await Pickup.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            { status },
            { new: true }
        );

        if (!pickup) {
            return res.status(404).json({
                success: false,
                message: 'Pickup not found'
            });
        }

        res.json({
            success: true,
            message: 'Pickup status updated successfully',
            pickup
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating pickup status',
            error: error.message
        });
    }
});

// Cancel pickup
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const pickup = await Pickup.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId,
            status: 'scheduled'
        });

        if (!pickup) {
            return res.status(404).json({
                success: false,
                message: 'Pickup not found or cannot be cancelled'
            });
        }

        res.json({
            success: true,
            message: 'Pickup cancelled successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error cancelling pickup',
            error: error.message
        });
    }
});

module.exports = router; 