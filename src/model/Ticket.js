const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');


const userSchema = new Schema({
    
    film_name: {
        type: String,
        default: null,
        required: [true, 'Please enter a film name'],
        minlength: 2,
        maxlength: 40,
        trim: true,
        unique: true
    },
    screen: {
        type: String,
        default: null,
        required: [true, 'Please enter a screen'],
        minlength: 1,
        maxlength: 40,
        trim: true,
    },
    customerID:{
        type: Number,
        min:1,
        max:2000,
        rearuited:false
    },
    seat_number:{
        type: Number,
        min:1,
        max:300,
        rearuited:false
    }

});

const Ticket = mongoose.model('Ticket', userSchema);

module.exports = Ticket;