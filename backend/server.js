const minerGuard = require('./app/MinerGuard.js');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// register static files
app.use(express.static(path.join(__dirname, 'webui')));

// register routes
var userRoutes = require('./app/api/routes/UserRoutes.js');
var earningRoutes = require('./app/api/routes/EarningRoutes.js');
var currencyRoutes = require('./app/api/routes/CurrencyRoutes.js');
var walletRoutes = require('./app/api/routes/WalletRoutes.js');

app.use('/api/user', userRoutes);
app.use('/api/earning', earningRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/wallet', walletRoutes);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'webui/index.html'));
});

// start server
var port = process.env.PORT || 8080;
app.listen(port);

// start app
minerGuard.startup();
console.log('Miner Guard App Starting... port: ' + port);