const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'TOO SHORT, first name must have at least 3 characters '],
        },
        middlename:{
            type: String,
            minlength: [3, 'TOO SHORT, mid name must have at least 3 characters '],
        },
        lastname:{
            type: String,
            minlength: [3, 'TOO SHORT, last name must have at least 3 characters'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address example: swabhi@123.dseu.ac.in']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId:{
        type: String,
    },
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;