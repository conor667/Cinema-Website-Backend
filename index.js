require('dotenv').config();
const express = require('express');
const database = require('./config/database.config');
const authenticationRouter = require('./route/AuthenticationRouter');
const exampleRouter = require('./route/ExampleRouter');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const PORT = process.env.PORT || 5500;

const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(authenticationRouter);
app.use('/example', exampleRouter);
app.use("/api/stripe",stripe);
async function main() {
    await database.connect();

    app.listen(PORT, () => {
        console.log(`Server up on ${PORT}`);
    });
}

main();