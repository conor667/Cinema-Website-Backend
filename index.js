const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

//Routers
const userRouter = require('./src/router/userRouter');
const movieRouter = require('./src/router/movieRouter');
const screenRouter = require('./src/router/screenRouter')
const ticketRouter = require('./src/router/TicketRouter');
const authenticationRouter = require('./src/router/AuthenticationRouter');

//Logger
const { simpleLogger, logHitSpecialEndpoint } = require('./src/loggers/generic');

//Database setup
const PORT = process.env.PORT || 5500;
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/QaCinema"
const app = express();

//Middleware setup
app.use(simpleLogger);
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup serving static files
app.use(express.static("public"));

//Authenticator
app.use(authenticationRouter);
app.use('/', userRouter);
app.use('/', movieRouter);
app.use('/', screenRouter);
app.use('/', ticketRouter);

//Main Method
let server;
mongoose.connect(DB_URL, { useNewUrlParser: true })
        .then(() => {
            console.log(`Database has been connected on mongodb 127.0.0.1:27017`);
            server = app.listen(PORT, () => console.log(`Server is up on port localhost:${PORT}!`));
        }).catch(error => {
            console.log(`Unable to connect to database.`)
        });
let databaseConnection = mongoose.connection;