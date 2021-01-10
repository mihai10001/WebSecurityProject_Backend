const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('./config')

const dbClient = new MongoClient(config.dbUri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

dbClient.connect((error, res) => {
});

module.exports = dbClient;

