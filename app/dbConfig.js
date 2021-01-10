const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('./config')

const dbClient = new MongoClient(config.dbUri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

dbClient.connect((error, res) => {
    // Seed default users for testing purposes
    // If users already found, don't add them
    dbClient.db('nodesecurityproject')
        .collection('users')
        .findOne({username: 'test'}, (err, user) => {
            if (!user)
                dbClient.db('nodesecurityproject').collection('users').insertOne(
                    {username: 'test', password: 'test', userToEvent: new ObjectID()}
                );
        });

    dbClient.db('nodesecurityproject')
        .collection('users')
        .findOne({username: 'test2'}, (err, user) => {
            if (!user)
                dbClient.db('nodesecurityproject').collection('users').insertOne(
                    {username: 'test2', password: 'test2', userToEvent: new ObjectID()}
                );
        });
});

module.exports = dbClient;

