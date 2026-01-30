const mongoose = require('mongoose');

const maintenanceLogSchema = new mongoose.Schema({
    equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    serviceDate: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MaintenanceLog', maintenanceLogSchema);
