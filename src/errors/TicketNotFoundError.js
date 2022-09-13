class TicketNotFoundError extends Error {

    constructor(id) {
        super(`Ticket not found with id ${id}`);
        this.id = id;
    }
}

module.exports = TicketNotFoundError;