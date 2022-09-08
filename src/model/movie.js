const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    filmName: {
        type: String,
        required: [true, 'Please enter the name of the movie'],
        unique: [true, 'Please enter a unique movie name.']
    },
    length: {
        type: Number,
        required: [true, 'Please enter the lenght of the movie in minutes.'],
        minlength: 60,
    },
    genre: {
        type: String,
        enum: ['Action' , 'Crime', 'Drama', 'Fantasy', 'Horror', 'Comedy', 'Romance', 'Science Fiction', 'Sports', 'Thriller', 'Mystery', 'War', 'Western'],
        required: [true, 'Please enter the film genre.'],
    },
    description:{
        type: String,
        min: 50 [`Movie description must be 50 characters or more.`],
        required: [true, 'Please enter a movie decription.']
    },
    rating:{
        type: String,
        enum: ['Uc', 'U', 'Pg', '12', '12A', '15', '18', 'R18'],
        required: [true, 'please enter the film RATING.']
    }
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
