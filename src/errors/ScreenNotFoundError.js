class ScreenNotFoundError extends Error {

    constructor(id) {
        super(`Screen not found with id ${id}`);
        this.id = id;
    }
}

module.exports = ScreenNotFoundError;