require('dotenv').config();
const express = require('express');
const database = require('./src/config/database.config');
const authenticationRouter = require('./src/router/AuthenticationRouter');
const userRouter = require('./src/router/UserRouter');
const cors = require('cors');

const PORT = process.env.PORT || 5500;

const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(authenticationRouter);
app.use('/example', userRouter);

async function main() {
    await database.connect();

    app.listen(PORT, () => {
        console.log(`Server up on ${PORT}`);
    });
}

main();