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
        // Read event information from request body
        const title = req.body.title;
        const description = req.body.description;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const allowedUsers = req.body.allowedUsers;

        // This line should require more validation
        if (!title || !description || !description || !startDate || !endDate) {
            res.status(400).send('Bad request: Not all info. given');
        } else {
            dbClient.collection('users')
                .findOne({username: req.decodedUsername}, (err, user) => {
                    if (err)
                        res.status(500).send('Internal server error: Db error');
                    else if (!user)
                        res.status(404).send('User not found');
                    else if (user) {
                        dbClient.collection('events')
                            .insertOne({
                                title: title,
                                description: description,
                                startDate: new Date(startDate),
                                endDate: new Date(endDate),
                                allowedUsers: [user.userToEvent].concat(allowedUsers)
                            })
                            .then(entry => res.status(200).send({ status: 'OK'}));
                    }
                });
        }
    });

}
