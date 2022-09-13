const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const screenSchema = new Schema({
    screenName: {
        type: String,
        default: null,
        required: [true, 'Please enter a screen name'],
        trim: true,
        unique: true
    },
    screenNumber:{
        type: Number,
        required: [true, 'Please enter the screen number']
    },
    standardSeats:{
        type: Number,
        required: [true, 'Please enter the amount of standard seats the screen has']
    },
    deluxeSeats:{
        type: Number,
        required: [true, 'Please enter the amount of deluxe seats the screen has']
    },
    film:{
        _id: String,
    }
});

const screen = mongoose.model('Screen', screenSchema);

module.exports = screen;