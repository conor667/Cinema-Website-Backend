const express = require('express');
const Screen = require('../model/screens');

//setting up router
const router = express.Router();

//Checks if the body contains Json data
function isJsonData(request, response, next) {
    if (request.headers['content-type'] !== 'application/json') {
        return next(new Error("Route only accepts JSON data."));
    }
    next();
}
//finds all screens
router.get("/screen", async (request, response) => {
    response.json(await Screen.find()); 
});

//Find screen by ID
router.get("/screen/:id", async (request, response, next) => {
    const screen = await Screen.findById(request.params.id);

    if (screen) {
        response.status(200).json(screen);
    } else {

        next(new Error(request.params.id));
    }
});
//create a screen
router.post("/screen", isJsonData, async (request, response, next) => {
    try {
        const screen = new Screen(request.body);
        await screen.save();

        response.status(201)
                .setHeader("Content-Location", `/screen/${screen.id}`)
                .json(screen);
    } catch (error) {
        next(error);
    }
});

// update a screen by ID
router.put("/screen/:id", isJsonData, async (request, response, next) => {
    const screen = await Screen.updateOne({ _id: request.params.id }, request.body);

    if (screen) {
        response.status(200).json(screen);
    } else {
        next(new Error(request.params.id));
    }
});

// delete a screen by ID
router.delete("/screen/:id", async (request, response, next) => {
    const screen = await Screen.findOneAndDelete({ _id: request.params.id });

    if (screen) {
        response.status(200).json(`deleted ${screen.screenName}`);
    } else {
        next(new Error(request.params.id));
    }
});

module.exports = router;