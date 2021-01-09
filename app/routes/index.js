const routes = require('./routes');

module.exports = function(app, dbClient) { 
  routes(app, dbClient);  
};