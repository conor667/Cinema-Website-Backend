const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


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
    seats:{
        type: Number,
        required: [true, 'Please enter the amount of seats the screen has']
    },
    film:{
        film_id: <ObjectId/>,
        name: String,
    }
});

const screen = mongoose.model('Screen', screenSchema);

module.exports = User;