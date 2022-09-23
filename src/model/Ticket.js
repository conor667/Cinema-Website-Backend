const { time } = require("console");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	film_name: {
		type: String,
		default: null,
		required: [true, "Please enter a film name"],
		minlength: 2,
		maxlength: 40,
		trim: true,
		unique: true,
	},
	screen: {
		type: String,
		default: null,
		required: [true, "Please enter a screen"],
		minlength: 1,
		maxlength: 40,
		trim: true,
	},
	customerID: {
		type: Number,
		min: 1,
		max: 2000,
		required: true,
	},
	seat_number: {
		type: String,
		default: "any",
		required: false,
	},
	time: {
		timestamps: true,
		type: Date,
	},
});

const Ticket = mongoose.model("Ticket", userSchema);

module.exports = Ticket;
