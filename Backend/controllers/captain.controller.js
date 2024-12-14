const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blackListTokenModel = require('../models/blacklistToken.model');
const {validationResult}= require('express-validator');

module.exports.registerCaptain = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const { fullname, email, password, vehicle } = req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if(isCaptainAlreadyExist){
        return res.status(400).json({message: 'Captain "o" captain you already exists'});
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.status(201).json({token,captain}); 
}
module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
}


module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({captain:req.captain});
}
module.exports.updateCaptainDetails = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { currentPassword, fullname, vehicle } = req.body;
        const captainId = req.captain._id; // From auth middleware
        
        const captain = await captainModel.findById(captainId).select('+password');
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }

        const isPasswordMatch = await captain.comparePassword(currentPassword);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid current password' });
        }

        // Update captain details, excluding password
        const updatedCaptain = await captainModel.findByIdAndUpdate(
            captainId,
            {
                fullname: {
                    firstname: fullname.firstname,
                    lastname: fullname.lastname,
                },
                vehicle: {
                    color: vehicle.color,
                    plate: vehicle.plate,
                    capacity: vehicle.capacity,
                    vehicleType: vehicle.vehicleType,
                }
            },
            { new: true } // Returns the updated captain document
        );

        res.status(200).json({ message: 'Captain profile updated successfully', captain: updatedCaptain });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
}