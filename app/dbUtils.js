const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbUri = require('./config').dbUri;
const bcrypt = require('bcrypt');
const bcryptSaltRounds = require('./config').bcryptSaltRounds;

let connectedDb;

// Seed default users for testing purposes
// If users already found, don't add them
const seedDefaultUsers = (connectedDb) => {
    connectedDb.collection('users')
        .findOne({username: 'test'}, (err, user) => {
            if (!user)
                bcrypt.hash('test', bcryptSaltRounds, function(err, hash) {
                    connectedDb.collection('users').insertOne(
                        {username: 'test', password: hash, userToEvent: new ObjectID()}
                    );
                });
        });

    connectedDb.collection('users')
        .findOne({username: 'test2'}, (err, user) => {
            if (!user)
                bcrypt.hash('test2', bcryptSaltRounds, function(err, hash) {
                    connectedDb.collection('users').insertOne(
                        {username: 'test2', password: hash, userToEvent: new ObjectID()}
                    );
                });
        });
};

module.exports = {
    connectToServer: (callback) => {
        MongoClient(dbUri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        }).connect((err, client) => {
            connectedDb = client.db('nodesecurityproject');
            seedDefaultUsers(connectedDb);
            return callback(err);
        });
    },
    getConnectedDb: () => {
      return connectedDb;
    }
};
