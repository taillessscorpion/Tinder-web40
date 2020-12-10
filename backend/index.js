const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./api');
require('./repositories');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

const PORT = 8088;
app.listen(PORT, ()=>{
    console.log('App running at ' + PORT);
});
