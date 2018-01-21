var main = require('./app/main.js');

var express = require('express'),
app = express(),
port = process.env.PORT || 8080;

app.listen(port);
console.log('Miner Guard Server started on: ' + port);


