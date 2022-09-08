const express = require('express');
const Movie = require('../model/movie');
const MovieNotFoundError = require('../errors/MovieNotFoundError');

//setting up router
const router = express.Router();

//Checks if the body contains Json data
function isJsonData(request, response, next) {
    if (request.headers['content-type'] !== 'application/json') {
        return next(new Error("Route only accepts JSON data."));
    }
    next();
}
//finds all movies 
router.get("/movie", async (request, response) => {
    response.json(await Movie.find()); 
});

//Find movie by ID
router.get("/movie/:id", async (request, response, next) => {
    const movie = await Movie.findById(request.params.id);

    if (movie) {
        response.status(200).json(movie);
    } else {

        next(new MovieNotFoundError(request.params.id));
    }
});
//create a movie
router.post("/movie", isJsonData, async (request, response, next) => {
    try {
        const movie = new Movie(request.body);
        await movie.save();

        response.status(201)
                .setHeader("Content-Location", `/movie/${movie.id}`)
                .json(movie);
    } catch (error) {
        next(error);
    }
});

// update a movie by ID
router.put("/movie/:id", isJsonData, async (request, response, next) => {
    const movie = await Movie.updateOne({ _id: request.params.id }, request.body);

    if (movie) {
        response.status(200).json(movie);
    } else {
        next(new MovieNotFoundError(request.params.id));
    }
});

// delete a movie by ID
router.delete("/movie/:id", async (request, response, next) => {
    const movie = await Movie.findOneAndDelete({ _id: request.params.id });

    if (movie) {
        response.status(200).json(movie);
    } else {
        next(new MovieNotFoundError(request.params.id));
    }
});

module.exports = router;