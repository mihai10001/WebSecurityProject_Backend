const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const dbClient = require('./dbConfig');

const app = express();
const port = 8000;
// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes/endpoints go here
routes(app, dbClient);

app.listen(port, () => {  
    console.log('Hello world from ' + port);
});