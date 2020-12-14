require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./api');
const path = require("path");
require('./repositories');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use("/public", express.static(path.join(__dirname, "public")));

const PORT = 8088;
app.listen(PORT, ()=>{
    console.log('App running at ' + PORT);
});
