const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    ride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ride',
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null,
    },
    feedback: {
        type: String,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Rating', ratingSchema);
