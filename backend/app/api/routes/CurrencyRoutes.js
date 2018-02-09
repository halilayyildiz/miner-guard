var express = require('express');
var currencyController = require('./../controllers/CurrencyController');

var router = express.Router();

router.route('/price/btcusd').get(currencyController.getBitcoinPrice);

module.exports = router;