const mongoose = require('mongoose');

const rideHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    fare: { type: Number, required: true },
    status: { type: String, required: true },
    captainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Captain', required: true }, // Ensure captainId exists
    createdAt: { type: Date, default: Date.now }
});


const RideHistory = mongoose.model('RideHistory', rideHistorySchema);

module.exports = RideHistory;
