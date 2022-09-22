const express = require("express");
const Movie = require("../model/movie");
const MovieNotFoundError = require("../errors/MovieNotFoundError");

//setting up router
const router = express.Router();

// const seed = new Movie({
// 	filmName: "X",
// 	imageURL: "https://m.media-amazon.com/images/M/MV5BMTJiMmE5YWItOWZjYS00YTg0LWE0MTYtMzg2ZTY4YjNkNDEzXkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg",
// 	length: "1h 45m",
// 	director: "Ti West",
// 	genre: "Horror",
// 	description: "In 1979, a group of young filmmakers set out to make an adult film in rural Texas, but when their reclusive, elderly hosts catch them in the act, the cast find themselves fighting for their lives.",
// 	rating: "R18",
// });
// seed.save();

//Checks if the body contains Json data
function isJsonData(request, response, next) {
	if (request.headers["content-type"] !== "application/json") {
		return next(new Error("Route only accepts JSON data."));
	}
	next();
}
//finds all movies
router.get("/movie", async (request, response) => {
	if (request.query.filmName) {
	} else response.json(await Movie.find());
});

//get movie by new release
router.get('/newfilm/:newfilm', async (request, response) => {
    try {
        const movie = await Movie.find({ newfilm: { $eq: request.params.newfilm } })
        response.send(movie);
    } catch {
        response.status(404);
        response.send({ error: 'no movies' })
    }
});

//get movie by film name
router.get('/filmCodeName/:filmCodeName', async (request, response) => {
    try {
        const movie = await Movie.find({ filmCodeName: { $eq: request.params.filmCodeName } })
        response.send(movie);
    } catch {
        response.status(404);
        response.send({ error: 'no movies' })
    }
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

		response.status(201).setHeader("Content-Location", `/movie/${movie.id}`).json(movie);
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
