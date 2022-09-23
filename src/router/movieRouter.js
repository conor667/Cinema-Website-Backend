const express = require("express");
const Movie = require("../model/movie");
const MovieNotFoundError = require("../errors/MovieNotFoundError");

//setting up router
const router = express.Router();

//immediate invoked async function
(async () => {
	const data = await Movie.find().exec(); //finds all movies
	if (data.length !== 0) {
		//if the movie collection is not equal to 0
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
			filmName: "SEE HOW THEY RUN",
			filmCodeName: "shtr",
			imageURL: "https://d4gvcu3i34zpu.cloudfront.net/media/original_images/FB-TW_SHTR_PAYOFF_WINDOW_1334x2000_FIN.jpg",
			length: "1h 38m",
			director: "Tom George",
			genre: "Comedy",
			description: "In the West End of 1950s London, plans for a movie version of a smash-hit play come to an abrupt halt after a pivotal member of the crew is murdered.",
			longDescription:
				"In 1950s London, plans for a movie version of a smash-hit play come to an abrupt halt after a pivotal member of the crew is murdered. When a world-weary inspector and an eager rookie constable take on the case, they find themselves thrown into a puzzling whodunit within the glamorously sordid world of underground theater, investigating the mysterious homicide at their own peril.",
			rating: "12A",
			pageURL: "http://localhost:3000/shtr",
			newfilm: true,
		},
		{
			filmName: "Top Gun: Maverick",
			filmCodeName: "topgm",
			imageURL: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg",
			length: "2h 10m",
			director: "Joseph Kosinski",
			genre: "Action",
			description:
				"After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
			longDescription:
				"After more than 30 years of service as one of the Navy's top aviators, Pete Maverick Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him. Training a detachment of graduates for a special assignment, Maverick must confront the ghosts of his past and his deepest fears, culminating in a mission that demands the ultimate sacrifice from those who choose to fly it.",
			rating: "12A",
			pageURL: "http://localhost:3000/topgm",
			newfilm: true,
		},
		{
			filmName: "Bullet Train",
			filmCodeName: "train",
			imageURL: "https://m.media-amazon.com/images/M/MV5BMDU2ZmM2OTYtNzIxYy00NjM5LTliNGQtN2JmOWQzYTBmZWUzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
			length: "2h 6m",
			director: "David Leitch",
			genre: "Action",
			description: "Five assassins aboard a fast moving bullet train find out their missions have something in common.",
			longDescription:
				"Ladybug is an unlucky assassin who's determined to do his job peacefully after one too many gigs has gone off the rails. Fate, however, may have other plans as his latest mission puts him on a collision course with lethal adversaries from around the globe -- all with connected yet conflicting objectives -- on the world's fastest train.",
			rating: "15",
			pageURL: "http://localhost:3000/train",
			newfilm: true,
		},
		{
			filmName: "Everything Everywhere All at Once",
			filmCodeName: "EEAAO",
			imageURL: "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_FMjpg_UX1000_.jpg",
			length: "2h 6m",
			director: "David Leitch",
			genre: "Action",
			description: "Five assassins aboard a fast moving bullet train find out their missions have something in common.",
			longDescription: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
			rating: "15",
			pageURL: "http://localhost:3000/EEAAO",
			newfilm: true,
		},
		{
			filmName: "Nope",
			filmCodeName: "nope1",
			imageURL: "https://m.media-amazon.com/images/M/MV5BZmQ4MjE3YjUtZWFhOS00YzQ3LWEyM2EtYTAxNWU1ZDkwZTg5XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
			length: "2h 15m",
			director: "Jordan Peele",
			genre: "Horror",
			description: "The residents of a lonely gulch in inland California bear witness to an uncanny and chilling discovery.",
			longDescription: "Two siblings running a horse ranch in California discover something wonderful and sinister in the skies above, while the owner of an adjacent theme park tries to profit from the mysterious, otherworldly phenomenon.",
			rating: "15",
			pageURL: "http://localhost:3000/nope",
			newfilm: false,
		},
		{
			filmName: "X",
			filmCodeName: "filmX",
			imageURL: "https://m.media-amazon.com/images/M/MV5BMTJiMmE5YWItOWZjYS00YTg0LWE0MTYtMzg2ZTY4YjNkNDEzXkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg",
			length: "1h 45m",
			director: "Ti West",
			genre: "Horror",
			description: "In 1979, a group of young filmmakers set out to make an adult film in rural Texas, but when their reclusive, elderly hosts catch them in the act, the cast find themselves fighting for their lives.",
			longDescription:
				"In 1979, aspiring pornographic actress Maxine Minx embarks on a road trip through Texas with her producer boyfriend Wayne, fellow actors Bobby-Lynne and Jackson Hole, director RJ, and RJ's girlfriend, Lorraine, to shoot an adult film for the booming theatrical pornography market. Bobby-Lynne and Jackson strike up a romance, while Lorraine is unimpressed with the film's content, and RJ attempts to make it seem like a serious cinematic piece but when their reclusive, elderly hosts catch them in the act, the cast find themselves fighting for their lives.",
			rating: "15",
			pageURL: "http://localhost:3000/filmx",
			newfilm: false,
		},
		{
			filmName: "The Batman",
			filmCodeName: "batman",
			imageURL: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
			length: "2h 56m",
			director: "Matt Reeves",
			genre: "Action",
			description: "Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past",
			longDescription:
				"Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues. As the evidence begins to lead closer to home and the scale of the perpetrator's plans become clear, he must forge new relationships, unmask the culprit and bring justice to the abuse of power and corruption that has long plagued the metropolis.",
			rating: "15",
			pageURL: "http://localhost:3000/batman",
			newfilm: false,
		},
		{
			filmName: "Doctor Strange in the Multiverse of Madness",
			filmCodeName: "drstr",
			imageURL: "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg",
			length: "2h 6m",
			director: "Sam Raimi",
			genre: "Action",
			description:
				"Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself, which threaten to wipe out millions across the multiverse. They seek help from Wanda the Scarlet Witch, Wong and others.",
			rating: "12A",
			pageURL: "http://localhost:3000/DrStr",
			newfilm: false,
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
router.get("/newfilm/:newfilm", async (request, response) => {
	try {
		const movie = await Movie.find({ newfilm: { $eq: request.params.newfilm } });
		response.send(movie);
	} catch {
		response.status(404);
		response.send({ error: "no movies" });
	}
});

//get movie by film name
router.get("/filmCodeName/:filmCodeName", async (request, response) => {
	try {
		const movie = await Movie.find({ filmCodeName: { $eq: request.params.filmCodeName } });
		response.send(movie);
	} catch {
		response.status(404);
		response.send({ error: "no movies" });
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
