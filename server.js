require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./src/routes');
const port = process.env.PORT || 9999;
const cors = require("cors");

//init db
require("./src/database/db");

//app uses
app.use(cors({ 'Access-Control-Allow-Origin': '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use(express.static('public'))
//app get requests
app.get('/', (req, res) => res.send('Server alive!'));

//starting server
app.listen(port, (() => {
    console.log("Listening on port " + port);
}));
