const Rating = require('../models/rating.model');

class RatingService {
    static async addRating(rideId, captainId, rating) {
        const newRating = new Rating({ ride: rideId, captain: captainId, rating });
        try {
            return await newRating.save();
        } catch (error) {
            console.error('Error saving rating:', error);
            throw error;
        }
    }

    static async markNoRating(rideId) {
        try {
            await Rating.updateOne({ ride: rideId }, { rating: null });
        } catch (error) {
            console.error('Error marking no rating:', error);
            throw error;
        }
    }

    static async getRatingsForCaptain(captainId) {
        try {
            return await Rating.aggregate([
                { $match: { captain: captainId } },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: '$rating' },
                        ratingCount: { $sum: 1 },
                    },
                },
            ]);
        } catch (error) {
            console.error('Error fetching captain ratings:', error);
            throw error;
        }
    }
}

module.exports = RatingService;
