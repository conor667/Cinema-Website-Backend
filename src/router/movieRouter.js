const express = require("express");
const Movie = require("../model/movie");
const MovieNotFoundError = require("../errors/MovieNotFoundError");

//setting up router
const router = express.Router();

//immediate called async function
(async () => {
	const data = await Movie.find().exec(); //finds all movies
	if (data.length !== 0) {
		//if the movie is not equal to 0
		return; //exit the function
	}
	async function seedMovies(movie) {
		//dclaring async function seedmovie
		const seed = new Movie(movie); // new movie object
		await seed.save(); //save the new movie object to db
	}
	const MovieList = [
		//create array of default movies to exist
		{
			filmName: "X",
			imageURL: "https://m.media-amazon.com/images/M/MV5BMTJiMmE5YWItOWZjYS00YTg0LWE0MTYtMzg2ZTY4YjNkNDEzXkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg",
			length: "1h 45m",
			director: "Ti West",
			genre: "Horror",
			description: "In 1979, a group of young filmmakers set out to make an adult film in rural Texas, but when their reclusive, elderly hosts catch them in the act, the cast find themselves fighting for their lives.",
			rating: "R18",
		},
		{
			filmName: "Nope",
			imageURL: "https://m.media-amazon.com/images/M/MV5BZmQ4MjE3YjUtZWFhOS00YzQ3LWEyM2EtYTAxNWU1ZDkwZTg5XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
			length: "2h 15m",
			director: "Jordan Peele",
			genre: "Horror",
			description: "The residents of a lonely gulch in inland California bear witness to an uncanny and chilling discovery.",
			rating: "15",
		},
		{
			filmName: "The Batman",
			imageURL: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
			length: "2h 56m",
			director: "Matt Reeves",
			genre: "Action",
			description: "Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past",
			rating: "15",
		},
		{
			filmName: "Top Gun: Maverick",
			imageURL: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg",
			length: "2h 10m",
			genre: "Action",
			director: "Joseph Kosinski",
			description:
				"After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
			rating: "12A",
		},
		{
			filmName: "Boiling Point",
			imageURL: "https://static.metacritic.com/images/products/movies/4/32b45132bcbe26711cf336316049500e.jpg",
			length: "1h 32m",
			director: "Philip Barantini",
			genre: "Drama",
			description: "Enter the relentless pressure of a restaurant kitchen as a head chef wrangles his team on the busiest day of the year..",
			rating: "15",
		},
		{
			filmName: "The Northman",
			imageURL: "https://m.media-amazon.com/images/M/MV5BMzVlMmY2NTctODgwOC00NDMzLWEzMWYtM2RiYmIyNTNhMTI0XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_.jpg",
			length: "2h 17m",
			director: "Robert Eggers",
			genre: "Action",
			description: "From visionary director Robert Eggers comes The Northman, an action-filled epic that follows a young Viking prince on his quest to avenge his father's murder.",
			rating: "15",
		},
		{
			filmName: "Doctor Strange in the Multiverse of Madness",
			imageURL: "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg",
			length: "2h 6m",
			director: "Sam Raimi",
			genre: "Action",
			description:
				"Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself, which threaten to wipe out millions across the multiverse. They seek help from Wanda the Scarlet Witch, Wong and others.",
			rating: "12A",
		},
		{
			filmName: "Doctor Strange in the Multiverse of Mad",
			imageURL: "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg",
			length: "2h 6m",
			director: "Sam Raimi",
			genre: "Action",
			description:
				"Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself, which threaten to wipe out millions across the multiverse. They seek help from Wanda the Scarlet Witch, Wong and others.",
			rating: "12A",
		},
	];
	MovieList.map((movie) => seedMovies(movie)); //map the aray to the function
})();

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
