var rp = require('request-promise');
var dbManager = require('./../db/DatabaseManager.js');
var constants = require('./../conf/constants');

module.exports = {
    refreshBitcoinPrice: refreshBitcoinPrice,
    getBitcoinPrice: getBitcoinPrice
};

var bitcoinPrice = 0;

function getBitcoinPrice() {
    return bitcoinPrice.last;
}

async function refreshBitcoinPrice() {
    var url = "https://www.bitstamp.net/api/ticker/";

    let response;
    try {
        response = await rp(url)
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }

    bitcoinPrice = JSON.parse(response);

    console.log("Bitcoin price updated: " + bitcoinPrice.last);
};