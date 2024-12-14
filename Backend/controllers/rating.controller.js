const RatingService = require('../services/rating.service');

exports.submitRating = async (req, res) => {
    const { rideId, captainId, rating } = req.body;

    if (!rideId || !captainId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        if (rating) {
            const newRating = await RatingService.addRating(rideId, captainId, rating);
            return res.status(201).json({ message: 'Rating submitted successfully', rating: newRating });
        } else {
            setTimeout(async () => {
                await RatingService.markNoRating(rideId);
            }, 120000); // 2 minutes
            return res.status(200).json({ message: 'Rating submission acknowledged' });
        }
    } catch (error) {
        console.error('Error submitting rating:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCaptainRatings = async (req, res) => {
    const { captainId } = req.params;

    try {
        const ratings = await RatingService.getRatingsForCaptain(captainId);
        return res.status(200).json(ratings.length ? ratings[0] : { averageRating: 0, ratingCount: 0 });
    } catch (error) {
        console.error('Error fetching ratings:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
