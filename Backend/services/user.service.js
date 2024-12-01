const userModel = require('../models/user.model');
const ratingService = require('../services/rating.service');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = await userModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
    });
    return user;
};

module.exports.getCustomerProfile = async (customerId) => {
    const customer = await userModel.findById(customerId);
    if (!customer) {
        throw new Error('Customer not found');
    }

    const averageRating = await ratingService.getAverageRating(customerId, 'customer');
    return { ...customer.toObject(), averageRating };
};
