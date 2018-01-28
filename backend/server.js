var minerGuard = require('./app/MinerGuard.js');
var bodyParser = require('body-parser');
var express = require('express');


var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// register static files
app.use(express.static('./../frontend/dist/'));

// set homepage
app.get("/", function(req, res) {
    res.sendFile("index.html", { "root": "./../frontend/dist" });
});

// register routes
var userRoutes = require('./app/api/routes/UserRoutes.js');
var earningRoutes = require('./app/api/routes/EarningRoutes.js');
app.use('/api/user', userRoutes);
app.use('/api/earning', earningRoutes);

// register not found page
app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});


// start server
var port = process.env.PORT || 8080;
app.listen(port);

// start app
minerGuard.startup();
console.log('Miner Guard App Starting... port: ' + port);