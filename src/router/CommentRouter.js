const express = require('express');
const Comment = require('../model/Comment');
const CommentNotFoundError = require('../errors/CommentNotFound');

//setting up router
const router = express.Router();

//Checks if the body contains Json data
function isJsonData(request, response, next) {
    if (request.headers['content-type'] !== 'application/json') {
        return next(new Error("Route only accepts JSON data."));
    }
    next();
}

//finds all comments
router.get("/comment", async (request, response) => {
    response.json(await Comment.find()); 
});

//Find Comment by ID
router.get("/comment/:id", async (request, response, next) => {
    const comment = await Comment.findById(request.params.id);

    if (comment) {
        response.status(200).json(comment);
    } else {

        next(new CommentNotFoundError(request.params.id));
    }
});

//create a comment
router.post("/comment", isJsonData, async (request, response, next) => {
    try {
        const comment = new Comment(request.body);
        await comment.save();

        response.status(201)
                .setHeader("Content-Location", `/comment/${comment.id}`)
                .json(comment);
    } catch (error) {
        next(error);
    }
});

// update a comment by ID
router.put("/comment/:id", isJsonData, async (request, response, next) => {
    const comment = await Comment.updateOne({ _id: request.params.id }, request.body);

    if (comment) {
        response.status(200).json(comment);
    } else {
        next(new CommentNotFoundError(request.params.id));
    }
});

// delete a comment by ID
router.delete("/comment/:id", async (request, response, next) => {
    const comment = await Comment.findOneAndDelete({ _id: request.params.id });

    if (comment) {
        response.status(200).json(`deleted ${comment.username} comment`);
    } else {
        next(new CommentNotFoundError(request.params.id));
    }
});

module.exports = router;