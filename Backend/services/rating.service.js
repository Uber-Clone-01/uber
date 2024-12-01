const Rating = require('../models/ratings.model');

module.exports.addRating = async (userId, role, rating) => {
    const existingRating = await Rating.findOne({ user: userId, role });
    if (!existingRating) {
        const newRating = await Rating.create({
            user: userId,
            role,
            totalRating: rating,
            totalReviews: 1,
            averageRating: rating,
        });
        return newRating;
    } else {
        existingRating.totalRating += rating;
        existingRating.totalReviews += 1;
        existingRating.averageRating = existingRating.totalRating / existingRating.totalReviews;
        await existingRating.save();
        return existingRating;
    }
};

module.exports.getAverageRating = async (userId, role) => {
    const rating = await Rating.findOne({ user: userId, role });
    if (!rating) throw new Error('Rating not found');
    return rating.averageRating;
};
