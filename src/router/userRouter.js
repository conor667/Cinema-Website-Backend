const express = require('express');
const User = require('../model/user');

const router = express.Router();

let idCounter = 1;
// const usersDatabase = [new User(idCounter++, "test1", "password1", "test@gmail.com",3,"07777777777",2022-02-02,"MEMBER")];

function isJsonData(request, response, next) {
    if (request.headers['content-type'] !== 'application/json') {
        return next(new Error("Route only accepts JSON data."));
    }
    next();
}
router.get("/user", (request, response) => {
    console.log("In get user");
    response.json(usersDatabase);
});

router.get("/user/:id", (request, response, next) => {
    const user = usersDatabase.find(u => u.id === parseInt(request.params.id));

    if (user) {
        response.status(200).json(user);
    } else {
        next(new UserNotFoundError(request.params.id));
    }
});
//create a user
router.post("/user", isJsonData, (request, response) => {
    const data = request.body;
    const user = new User(idCounter++, data.username, data.password, data.email,data.age,
                            data.phonenumber,data.createdAt,data.role);
    usersDatabase.push(user);
    response.status(201)
            .setHeader("Content-Location", `/user/${user.id}`)
            .json(user); 
});

// update
router.put("/user/:id", isJsonData, (request, response) => {
    const id = parseInt(request.params.id);
    const data = request.body;
    const userIndex = usersDatabase.findIndex(u => u.id === id);

    if (userIndex === -1) return next(new UserNotFoundError(id));
    const priorState = usersDatabase[userIndex];
    usersDatabase[userIndex] = new User(id, data.username || priorState.username, 
                                        data.password || priorState.password, 
                                        data.email || priorState.email,
                                        data.age || priorState.age,
                                        data.phonenumber || priorState.phonenumber,
                                        data.createdAt || priorState.createdAt,
                                        data.role || priorState.role);
    response.status(200)
            .json(usersDatabase[userIndex]);
});

// delete
router.delete("/user/:id", (request, response, next) => {
    const id = parseInt(request.params.id);
    const userIndex = usersDatabase.findIndex(user => user.id === id);

    if (userIndex === -1) return next(new UserNotFoundError(id));

    usersDatabase.splice(userIndex, 1);

    response.sendStatus(200);
});

module.exports = router;