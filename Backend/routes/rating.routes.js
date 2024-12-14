const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');

router.post('/submit-rating', ratingController.submitRating);
router.get('/:captainId/ratings', ratingController.getCaptainRatings);

module.exports = router;
