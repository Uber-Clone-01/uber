const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    role: {
        type: String,
        enum: ['captain', 'customer'],
        required: true,
    },
    totalRating: {
        type: Number,
        default: 0,
    },
    totalReviews: {
        type: Number,
        default: 0,
    },
    averageRating: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('Rating', ratingSchema);
