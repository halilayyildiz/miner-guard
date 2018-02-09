var currencyService = require('./../../service/CurrencyService.js');
var util = require('./../../util/Util.js');

exports.getBitcoinPrice = async function(req, res) {

    let bitcoinPrice = await currencyService.getBitcoinPrice();
    res.json(bitcoinPrice);
};