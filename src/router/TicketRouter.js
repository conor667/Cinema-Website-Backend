const express = require('express');
const Ticket = require('../model/Ticket');
const TicketNotFoundError = require('../errors/TicketNotFoundError');

//setting up router
const router = express.Router();

//Checks if the body contains Json data
function isJsonData(request, response, next) {
    if (request.headers['content-type'] !== 'application/json') {
        return next(new Error("Route only accepts JSON data."));
    }
    next();
}
//finds all Tickets
router.get("/ticket", async (request, response) => {
    response.json(await Ticket.find()); 
});

//Find Ticket by ID
router.get("/ticket/:id", async (request, response, next) => {
    const ticket = await Ticket.findById(request.params.id);

    if (ticket) {
        response.status(200).json(ticket);
    } else {

        next(new TicketNotFoundError(request.params.id));
    }
});
//create a ticket
router.post("/ticket", isJsonData, async (request, response, next) => {
    try {
        const ticket = new Ticket(request.body);
        await ticket.save();

        response.status(201)
                .setHeader("Content-Location", `/ticket/${ticket.id}`)
                .json(ticket);
    } catch (error) {
        next(error);
    }
});

// update a ticket by ID
router.put("/ticket/:id", isJsonData, async (request, response, next) => {
    const ticket = await Ticket.updateOne({ _id: request.params.id }, request.body);

    if (ticket) {
        response.status(200).json(ticket);
    } else {
        next(new TicketNotFoundError(request.params.id));
    }
});

// delete a ticket by ID
router.delete("/ticket/:id", async (request, response, next) => {
    const ticket = await Ticket.findOneAndDelete({ _id: request.params.id });

    if (ticket) {
        response.status(200).json(`deleted ${ticket.film_name}`);
    } else {
        next(new TicketNotFoundError(request.params.id));
    }
});

module.exports = router;