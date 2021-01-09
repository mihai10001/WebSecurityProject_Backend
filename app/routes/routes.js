module.exports = function(app, dbClient) {
  app.get('/', (req, res) => {

    dbClient.connect(err => {
      dbClient.db('nodesecurityproject').collection('users').find({}).toArray()
        .then( users => {
          console.log('All users', users);
          dbClient.close();
        });
    });

    res.send('Hello world :P');
  });
};