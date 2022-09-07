const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        default: null,
        required: [true, 'Please enter a username between 4 and 32 characters'],
        minlength: 4,
        maxlength: 32,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false 
    },
    email: {
        type: String,
        minlength: 8,
        maxlength: 128,
        trim: true,
        required: [true, 'Please enter an Email between 8 and 128 characters'],
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    age:{
        type: Number,
        min: 13 [`Please enter an age over 13. If you are under 13 years old please get a Parent/Guardian to create an account instead`],
        required: [true, 'Please enter your age']
    },
    phonenumber:{
        type:Number,
        min:10,
        max:11,
        rearuited:false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        enum: ['STAFF', 'MEMBER'],
        default: 'MEMBER'
    }
});

userSchema.pre('save', async function(next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;