const jwt = require('jsonwebtoken');
const secretKey = require('../config').secretKey;

module.exports = function(app, dbClient) {

    app.post('/login', (req, res) => {
        // Read username and password from request body
        const { username, password } = req.body;

        // This line should require more validation
        if (!username || !password) {
            res.send('Username or password not given');
        } else {
            // Filter/find first user that meets the criteria from the DB
            // Generate an access token, default signing with HMAC SHA256
            dbClient.db('nodesecurityproject')
                .collection('users')
                .findOne({'username': username,'password': password}, (err, user) => {
                    if (!user) {
                        res.send('User not found! Username or password incorrect');
                    } else {
                        const accessToken = jwt.sign({ username: user.username }, secretKey);
                        res.json({accessToken});  
                    }
                });
        }
    });

};
