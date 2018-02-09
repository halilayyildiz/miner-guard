var express = require('express');
var currencyController = require('./../controllers/currencyController');

var router = express.Router();

router.route('/price/btcusd').get(currencyController.getBitcoinPrice);

module.exports = router;