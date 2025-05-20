const express = require('express');
const router = express.Router();
const {authMiddleware,adminMiddleware} = require('../middleware/auth');
const WasteType = require('../models/wasteType');

// Get all waste types
router.get('/types', async (req, res) => {
    try {
        const wasteTypes = await WasteType.find();
        res.json({
            success: true,
            wasteTypes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching waste types',
            error: error.message
        });
    }
});

// Get waste type by ID
router.get('/types/:id', async (req, res) => {
    try {
        const wasteType = await WasteType.findById(req.params.id);
        if (!wasteType) {
            return res.status(404).json({
                success: false,
                message: 'Waste type not found'
            });
        }

        res.json({
            success: true,
            wasteType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching waste type',
            error: error.message
        });
    }
});

// Add new waste type (admin only)
router.post('/AddTypes', adminMiddleware, async (req, res) => {
    try {
        const { name, description, pricePerKg, imageUrl, category,isActive,processingInstructions,environmentalImpact,recyclingProcess,benefits,restrictions,createdBy } = req.body;

        const wasteType = new WasteType({
            name,
            description,
            category,
            pricePerKg,
            imageUrl,
            isActive,processingInstructions,environmentalImpact,recyclingProcess,benefits,restrictions,createdBy
        });

        await wasteType.save();

        res.status(201).json({
            success: true,
            message: 'Waste type added successfully',
            wasteType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding waste type',
            error: error.message
        });
    }
});

// Update waste type (admin only)
router.put('/types/:id', authMiddleware, async (req, res) => {
    try {
        const { name, description, pricePerKg, imageUrl, category } = req.body;

        const wasteType = await WasteType.findByIdAndUpdate(
            req.params.id,
            { name, description, pricePerKg, imageUrl, category },
            { new: true, runValidators: true }
        );

        if (!wasteType) {
            return res.status(404).json({
                success: false,
                message: 'Waste type not found'
            });
        }

        res.json({
            success: true,
            message: 'Waste type updated successfully',
            wasteType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating waste type',
            error: error.message
        });
    }
});

// Delete waste type (admin only)
router.delete('/types/:id', authMiddleware, async (req, res) => {
    try {
        const wasteType = await WasteType.findByIdAndDelete(req.params.id);

        if (!wasteType) {
            return res.status(404).json({
                success: false,
                message: 'Waste type not found'
            });
        }

        res.json({
            success: true,
            message: 'Waste type deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting waste type',
            error: error.message
        });
    }
});

// Get waste categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await WasteType.distinct('category');
        res.json({
            success: true,
            categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching waste categories',
            error: error.message
        });
    }
});

module.exports = router; 