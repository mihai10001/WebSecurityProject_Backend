const checkTokenMiddleware = require('../checkTokenValidityMiddleware');

module.exports = function(app, dbClient) {

    app.get('/events', checkTokenMiddleware, (req, res) => {
        dbClient.collection('users')
            .findOne({username: req.username}, (err, user) => {
                if (err)
                    res.status(500).send('Internal server error: Db error');
                else if (!user)
                    res.status(404).send('User not found');
                else if (user) {
                    dbClient.collection('events')
                        .find({allowedUsers: user.userToEvent})
                        .toArray()
                        .then(allowedEventsArray => res.json(allowedEventsArray));
                }
            });
    });

    app.post('/create-event', checkTokenMiddleware, (req, res) => {
        dbClient.collection('users')
            .findOne({username: req.username}, (err, user) => {
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
