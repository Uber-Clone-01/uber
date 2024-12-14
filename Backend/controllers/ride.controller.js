const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const rideHistoryModel = require('../models/rideHistory.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        console.log(captainsInRadius)
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        ride.otp = ""; // Set OTP if required.

        captainsInRadius.map((captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser,
            });
        });

        return res.status(201).json(ride);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        // Ensure captain information is present
        if (!req.captain || !req.captain._id) {
            return res.status(400).json({ message: 'Captain information is missing' });
        }

        // Update the ride
        const updatedRide = await rideModel.findOneAndUpdate(
            { _id: rideId },
            { status: 'accepted', captain: req.captain._id },
            { new: true }
        );

        if (!updatedRide) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Populate ride details
        const ride = await rideModel
            .findOne({ _id: rideId })
            .populate('user')
            .populate('captain')
            .select('+otp');

        // Create ride history
        const historyEntry = {
            userId: ride.user._id,
            pickup: ride.pickup,
            destination: ride.destination,
            fare: ride.fare,
            status: ride.status,
            captainId: req.captain._id,  // Fix: Add captainId here
            createdAt: new Date(),
        };

        await rideHistoryModel.create(historyEntry);

        // Send WebSocket notification
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride,
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getUserRideHistory = async (req, res) => {
    try {
        //console.log('Authenticated user: mene likha bc ', req.user)
        const rides = await Ride.find({ userId: req.user._id });  
        if (!rides) {
            return res.status(404).json({ message: 'No ride history found.' });
        }
        res.status(200).json({ rides });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching ride history.' });
    }
};


module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } s
}
/*module.exports.submitRating = async (req, res) => {
    const { rideId, customerRating, captainRating } = req.body;
    
    try {
        const ride = await rideModel.findById(rideId);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Update the rating for both customer and captain
        ride.rating.customer = customerRating;
        ride.rating.captain = captainRating;
        
        await ride.save();  // Save the ride with updated ratings

        return res.status(200).json({ message: 'Rating submitted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}; 
exports.submitRating = async (req, res) => {
    const { rideId, captainRating } = req.body;

    // Validate input
    if (!rideId || !captainRating) {
        return res.status(400).json({ message: 'Ride ID and Captain Rating are required.' });
    }

    try {
        // Find the ride by its ID
        const ride = await rideModel.findById(rideId);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Update the captain's rating in the ride document
        ride.rating.captain = captainRating;

        // Save the updated ride document
        await ride.save();

        return res.status(200).json({ message: 'Rating submitted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.submitRating = async (req, res) => {
    const { rideId, captainRating } = req.body;

    if (!rideId || !captainRating) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Update the captain's rating
        ride.rating.captain = captainRating;

        await ride.save();  // Save the ride with the new captain rating

        res.status(200).json({ message: 'Rating submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};*/
