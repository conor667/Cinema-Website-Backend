const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

//Routers
const userRouter = require('./src/router/userRouter');
const authenticationRouter = require('./src/router/AuthenticationRouter');

//Database setup
const DB_URI = "mongodb://127.0.0.1:27017/qa-cinemas";
const PORT = 5000;
const app = express();

//Middleware setup
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(authenticationRouter);
app.use('/example', userRouter);

async function main() {
    await mongoose.connect(DB_URI, { useNewUrlParser : true, useUnifiedTopology: true })
                  .then(() => console.log(`Database has been connected: ${DB_URI}`));

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Database connection error'));
    db.on('connection', console.log.bind(console, 'Database connected'));
    
    const server = app.listen(PORT, function() {
        console.log(`Server up on localhost:${PORT}`);
    });
}
main();