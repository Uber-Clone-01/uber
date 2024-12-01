const captainModel = require('../models/captain.model');
const ratingService = require('../services/rating.service');

module.exports.createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        },
    });

    return captain;
};

module.exports.getCaptainProfile = async (captainId) => {
    const captain = await captainModel.findById(captainId);
    if (!captain) {
        throw new Error('Captain not found');
    }

    const averageRating = await ratingService.getAverageRating(captainId, 'captain');
    return { ...captain.toObject(), averageRating };
};
