require('dotenv').config();
const express = require('express');
const database = require('./src/config/database.config');
const authenticationRouter = require('./src/router/AuthenticationRouter');
const userRouter = require('./src/router/UserRouter');
const cors = require('cors');
const { simpleLogger, logHitSpecialEndpoint } = require('./src/loggers/generic');

const PORT = process.env.PORT || 5500;

const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(authenticationRouter);
app.use('/example', userRouter);
app.get("/special", logHitSpecialEndpoint, (request, response, next) => {
    console.log("Now in /special handler");
    next();
}, (request, response) => {
    response.send("Done with the /special route now");
});
app.use((error, request, response, next) => {
    console.error(error.message);
    let responseCode = 500;

    if (error instanceof UserNotFoundError) {
        responseCode = 404;
    }
    
    return response.status(responseCode).json({
        message: error.message
    });
});
async function main() {
    await database.connect();

    app.listen(PORT, () => {
        console.log(`Server up on ${PORT}`);
    });
}
main();