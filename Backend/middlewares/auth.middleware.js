const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blackListTokenModel = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');

const handleTokenErrors = (err, res) => {
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            message: 'Session expired. Please log in again.',
            expiredAt: err.expiredAt,
        });
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            message: 'Invalid token. Please log in again.',
        });
    } else {
        console.error('JWT Error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    try {
        const isBlacklisted = await blackListTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        return handleTokenErrors(err, res);
    }
};

module.exports.authCaptain = async (req, res, next) => {
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    try {
        const isBlacklisted = await blackListTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }

        req.captain = captain; // Attach captain to request object
        next();
    } catch (err) {
        return handleTokenErrors(err, res);
    }
}; /*
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');

// Error handling utility for token verification
const handleTokenError = (err, res) => {
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            message: 'Session expired. Please log in again.',
            expiredAt: err.expiredAt,
        });
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token. Please log in again.' });
    }
    console.error('JWT Error:', err);
    return res.status(500).json({ message: 'Internal server error' });
};

// Middleware to authenticate user
const authUser = async (req, res, next) => {
    try {
        // Extract token from headers or cookies
        const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token not provided' });
        }

        // Check if token is blacklisted
        const blacklistedToken = await blackListTokenModel.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch user using decoded ID
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user data to request object and proceed
        req.user = user;
        next();

    } catch (err) {
        return handleTokenError(err, res);
    }
};

// Middleware to authenticate captain
const authCaptain = async (req, res, next) => {
    try {
        // Extract token from headers or cookies
        const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token not provided' });
        }

        // Check if token is blacklisted
        const blacklistedToken = await blackListTokenModel.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch captain using decoded ID
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }

        // Attach captain data to request object and proceed
        req.captain = captain;
        next();

    } catch (err) {
        return handleTokenError(err, res);
    }
};

module.exports = { authUser, authCaptain };

*/