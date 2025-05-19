const mongoose = require('mongoose');

const wasteTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['plastic', 'paper', 'metal', 'glass', 'organic', 'e-waste', 'hazardous']
    },
    pricePerKg: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    processingInstructions: String,
    environmentalImpact: {
        type: String,
        required: true
    },
    recyclingProcess: {
        type: String,
        required: true
    },
    benefits: [String],
    restrictions: [String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
});

// Index for efficient querying


const WasteType = mongoose.model('wasteType', wasteTypeSchema);

module.exports = WasteType; 