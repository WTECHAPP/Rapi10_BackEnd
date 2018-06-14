var express       =  require('express');
var app           =  express();
var consign       =  require('consign');

//consign({verbose: false}).include("boot.js").then('config.js').then('sendMail.js').then("db.js").then('util.js').then("models").then("libs").then("routes").into(app);

consign({verbose: false}).include("boot.js").then('config.js').then('sendMail.js').then("db.js").then('session.js').then('util.js').then("libs").then("routes").into(app);

module.exports = app;
