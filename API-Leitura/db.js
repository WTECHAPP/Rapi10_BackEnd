var Redis         = require('ioredis');
var mysql         =  require('mysql');
var connection    =  require('express-myconnection');

module.exports = (app) => {

  app.use(connection(mysql, { host: 'localhost', user: 'root', password : 'root', port : 3306, database:'db_MyApp', multipleStatements: true }, 'request'));

  const options = {
     user: 'root',
     pass: 'root',
     auth: {
         authdb: 'admin'
     }
  };
  mongoose.connect('localhost', 'MyAPI', 99999, options);

  const redis = new Redis('redis://:MyPass@localhost:6379/15');

  return {
    mongoose: mongoose,
    redis: redis
  };
};
