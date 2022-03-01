require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./src/routes');
const db = require("./src/database/db");
const port = process.env.PORT || 9999;

//app uses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

//app get requests
app.get('/', (req, res) => res.send('Server alive!'));

//starting server and tradebot
app.listen(port, (() => {
    console.log("Listening on port " + port);
}));

