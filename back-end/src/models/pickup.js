const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    pickupTime: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        landmark: String
    },
    wasteType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'wasteType',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    specialInstructions: String,
    status: {
        type: String,
        enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    paymentAmount: {
        type: Number,
        default: 0
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    completedAt: Date,
    notes: String
}, {
    timestamps: true
});

// Index for efficient querying
pickupSchema.index({ user: 1, status: 1 });
pickupSchema.index({ pickupDate: 1, status: 1 });

const Pickup = mongoose.model('pickup', pickupSchema);

module.exports = Pickup; 