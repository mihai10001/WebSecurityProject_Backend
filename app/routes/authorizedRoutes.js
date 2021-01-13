const checkTokenMiddleware = require('../checkTokenValidityMiddleware');

module.exports = function(app, dbClient) {

    app.get('/other-users', checkTokenMiddleware, (req, res) => {
        dbClient.collection('users')
            .find({username: {$ne : req.decodedUsername}})
            .project({_id: 0, password: 0})
            .toArray()
            .then(otherUsersArray =>  res.json(otherUsersArray));
    });

    app.get('/events', checkTokenMiddleware, (req, res) => {
        dbClient.collection('users')
            .findOne({username: req.decodedUsername}, (err, user) => {
                if (err)
                    res.status(500).send('Internal server error: Db error');
                else if (!user)
                    res.status(404).send('User not found');
                else if (user) {
                    dbClient.collection('events')
                        .find({allowedUsers: user.userToEvent})
                        .project({_id: 0})
                        .toArray()
                        .then(allowedEventsArray => {
                            allowedEventsArray.forEach(function (item, i) {
                                allowedEventsArray[i].allowedUsers = item.allowedUsers.length;
                                if (i == allowedEventsArray.length - 1)
                                    res.json(allowedEventsArray);
                            });
                        });
                }
            });
    });

    app.post('/create-event', checkTokenMiddleware, (req, res) => {
        dbClient.collection('users')
            .findOne({username: req.decodedUsername}, (err, user) => {
                if (err)
                    res.status(500).send('Internal server error: Db error');
                else if (!user)
                    res.status(404).send('User not found');
                else if (user) {
                    // Information regarding events will be sent by user, eg. startDate
                    dbClient.collection('events')
                        .insertOne({
                            title: 'random',
                            description: 'random',
                            startDate: new Date(),
                            endDate: new Date(),
                            allowedUsers: [user.userToEvent]
                        });
                }
            });

        res.sendStatus(200);
    });

}
