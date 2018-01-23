var main = require('./app/main.js');
var bodyParser = require('body-parser');
var express = require('express');

var earningRoutes = require('./app/api/routes/EarningRoutes.js');


var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// register routes
app.use('/api/earning', earningRoutes);

var port = process.env.PORT || 8080;
app.listen(port);

console.log('Miner Guard App Started ' + port);

main.startup();
