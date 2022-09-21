const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../model/User");
const jwtUtils = require("../config/JwtUtils");
const { authenticationMiddleware } = require("../config/JwtUtils");
const expiration = jwtUtils.JWT_TIMEOUT;

router.post("/refresh", authenticationMiddleware, async (request, response, next) => {
	const user = request.user;
	const token = jwtUtils.generateAccessToken(user.username);
	response.setHeader("Authorization", token);
	return response.status(200).json({ token, expiration, user });
});

function isAuthenticated(request, response) {
	try {
		console.log(request.cookies);
		response.setHeader("Authorization", token);
		response.cookie("Authorization", token, expiration);
	} catch (err) {
		console.log(err);
		return response.status(403);
	}
}

router.get("/auth", isAuthenticated, async (request, response) => {
	return response.status(200);
});

router.post("/register", async (request, response, next) => {
	try {
		const user = new User({ ...request.body });

		const isUser = await User.findOne({ $or: [{ username: user.username }, { email: user.email }] });

		if (isUser) {
			return response.status(409).send("This user already exists!");
		}

		await user.save();

		return response.status(201).json(`User ${user.username} has been created, please log in.`);
	} catch (err) {
		return next(err);
	}
});

router.post("/login", async (request, response, next) => {
	try {
		const email = request.body.email;
		const password = request.body.password;

		console.log(email, password);
		const user = await User.findOne({ email }).select("+password");

		if (user) {
			if (await bcrypt.compare(password, user.password)) {
				user.password = undefined;
				const token = jwtUtils.generateAccessToken(user.email, user.role);
				response.setHeader("Authorization", token);
				response.cookie("Authorization", token);

				return response.status(200).json({ token, expiration, user });
			}
		}
		return response.status(400).send("Invalid login details.");
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
