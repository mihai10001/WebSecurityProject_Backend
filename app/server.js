const express = require('express');
// const bodyParser = require('body-parser');
const routes = require('./routes');
const MongoClient = require('mongodb').MongoClient;

// Don't make this URI public on GitHub
const dbUri = '';
const dbClient = new MongoClient(dbUri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const app = express();
const port = 8000;

// Routes/endpoints go here
routes(app, dbClient);

app.listen(port, () => {  
    console.log('Hello world from ' + port);
});