class CommentNotFoundError extends Error {

    constructor(id) {
        super(`Comment not found with id ${id}`);
        this.id = id;
    }
}

module.exports = CommentNotFoundError;