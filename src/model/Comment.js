const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    email: {
        type: String,
        minlength: 8,
        maxlength: 128,
        trim: true,
        required: [true, 'Please enter an Email between 8 and 128 characters'],
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    comment: {
        type: String,
        default: null,
        required: [true, 'Please enter a comment'],
        minlength: 4,
        maxlength: 600,
    }


});

const Comment = mongoose.model('Comment', userSchema);

module.exports = Comment;