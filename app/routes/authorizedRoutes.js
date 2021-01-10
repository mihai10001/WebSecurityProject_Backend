const checkTokenMiddleware = require('../checkTokenValidityMiddleware');

module.exports = function(app, dbClient) {

    app.get('/events', checkTokenMiddleware, (req, res) => {
        dbClient.db('nodesecurityproject')
            .collection('users')
            .findOne({username: req.username}, (err, user) => {
                if (err)
                    res.status(400).send('DB error');

                if (user) {
                    dbClient.db('nodesecurityproject')
                        .collection('events')
                        .find({allowedUsers: user.userToEvent})
                        .toArray()
                        .then(allowedEventsArray => res.json(allowedEventsArray));
                } else {
                    res.status(400).send('User not found');
                }
            });
    });

    app.post('/create-event', checkTokenMiddleware, (req, res) => {
        dbClient.db('nodesecurityproject')
            .collection('users')
            .findOne({username: req.username}, (err, user) => {
                if (err)
                    res.status(400).send('DB error');

                if (user) {
                    // Information regarding events will be sent by user, eg. startDate
                    dbClient.db('nodesecurityproject')
                        .collection('events')
                        .insertOne({
                            title: 'random',
                            description: 'random',
                            startDate: new Date(),
                            endDate: new Date(),
                            allowedUsers: [user.userToEvent]
                        });
                } else {
                    res.status(400).send('User not found');
                }
            });

        res.sendStatus(200);
    });

}
