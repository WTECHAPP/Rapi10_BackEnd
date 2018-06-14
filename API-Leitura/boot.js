var bodyParser    =  require('body-parser');
var fs            = require('fs');
var express       = require('express');
var multiparty    = require('connect-multiparty');
var expressValidator    = require('express-validator');
var multipartyMiddleware = multiparty();

module.exports = (app) => {

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(expressValidator());
  app.use(multipartyMiddleware);

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,content-type,token");

    if ('OPTIONS' == req.method){
      //express deprecated res.send(status): Use res.sendStatus(status) instead boot.js:21:11
      //res.send(200);
      res.sendStatus(200);
    } else {
      next();
    }
  });

  app.use(express.static("public"))

  app.set("json spaces", 4);

  var port = process.env.PORT || 5000;

  app.listen(port);
}
