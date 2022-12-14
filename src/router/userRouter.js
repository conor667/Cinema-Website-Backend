const express = require("express");
const User = require("../model/User");
const UserNotFoundError = require("../errors/UserNotFoundError");

//setting up router
const router = express.Router();

(async () => {
	const data = await User.find().exec();
	if (data.length !== 0) {
		return;
	}
	const seed = new User({ username: "Justin", password: "password", email: "123@gmail.com", date_of_birth: new Date("10/10/2000") });
	await seed.save();
})();

//Checks if the body contains Json data
function isJsonData(request, response, next) {
	if (request.headers["Content-Type"] !== "application/json") {
		return next(new Error("Route only accepts JSON data."));
	}
	next();
}
//finds all users
router.get("/user", async (request, response) => {
	response.json(await User.find());
});

//Find user by ID
router.get("/user/:id", async (request, response, next) => {
	const user = await User.findById(request.params.id);

	if (user) {
		response.status(200).json(user);
	} else {
		next(new UserNotFoundError(request.params.id));
	}
});

//create a user
router.post("/user", isJsonData, async (request, response, next) => {
	try {
		const user = new User(request.body);
		await user.save();

		response.status(201).setHeader("Content-Location", `/user/${user.id}`).json(user);
	} catch (error) {
		next(error);
	}
});

// update a user by ID
router.put("/user/:id", isJsonData, async (request, response, next) => {
	const user = await User.updateOne({ _id: request.params.id }, request.body);

	if (user) {
		response.status(200).json(user);
	} else {
		next(new UserNotFoundError(request.params.id));
	}
});

// delete a user by ID
router.delete("/user/:id", async (request, response, next) => {
	const user = await User.findOneAndDelete({ _id: request.params.id });

	if (user) {
		response.status(200).json(user);
	} else {
		next(new UserNotFoundError(request.params.id));
	}
});

module.exports = router;
