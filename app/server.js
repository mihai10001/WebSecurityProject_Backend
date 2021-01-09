const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
// const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 8000;

// Routes/endpoints go here
routes(app, {});

app.listen(port, () => {  
    console.log('Hello world from ' + port);
});