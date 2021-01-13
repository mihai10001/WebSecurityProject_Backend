const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbUri = require('./config').dbUri;
const bcrypt = require('bcrypt');
const bcryptSaltRounds = require('./config').bcryptSaltRounds;

let connectedDb;
let defaultUsers = [
    {username: 'Blablabla1', password: 'uB>kHtLLDf9FE3u84'},
    {username: 'Blablabla2', password: 'GFNHOhFvPD202L!vV'},
    {username: 'Blablabla3', password: '<dZA*GX0pWOo1YGq<'},
    {username: 'Blablabla4', password: 'jBvpJmJh2%)yk<OC]'},
];

// Seed default users for testing purposes
// If users already found, don't add them
const seedDefaultUsers = (connectedDb) => {
    for (const defaultUser of defaultUsers) {  
        connectedDb.collection('users')
            .findOne({username: defaultUser.username}, (err, user) => {
                if (!user)
                    bcrypt.hash(defaultUser.password, bcryptSaltRounds, function(err, hash) {
                        connectedDb.collection('users').insertOne(
                            {username: defaultUser.username, password: hash, userToEvent: new ObjectID()}
                        );
                    });
            });
    }
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
