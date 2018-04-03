var rp = require('request-promise');
var moment = require('moment-timezone');
var dbManager = require('./../db/DatabaseManager.js');
var constants = require('./../conf/constants');

module.exports = {
    getBitcoinPrice: getBitcoinPrice,
    getBitcoinPriceOfDay: getBitcoinPriceOfDay,
    updateBitcoinPrice: updateBitcoinPrice
};

// actual bitcoin price
let bitcoinPrice;
// historical bitcoin prices
let bitcoinPrices = [];

function getBitcoinPrice() {
    return bitcoinPrice.last;
}

async function getBitcoinPriceOfDay(day) {
    var today = moment().tz('Europe/Istanbul').format("YYYY-MM-DD");
    // for today run actual value
    if (day == today) {
        return bitcoinPrice.last;
    } else if (bitcoinPrices[`${day}`]) {
        return bitcoinPrices[`${day}`];
    } else {
        let price = await dbManager.getBitcoinPrice(day);
        if (price) {
            // update historical price list
            bitcoinPrices[`${day}`] = price;
        } else {
            price = 0;
        }
        return price;
    }
}

async function updateBitcoinPrice() {
    var url = "https://www.bitstamp.net/api/ticker/";

    let response;
    try {
        response = await rp(url)
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }

    bitcoinPrice = JSON.parse(response);

    // log to database
    dbManager.updateBitcoinPrice(bitcoinPrice.last);

    console.log("Bitcoin price updated: " + bitcoinPrice.last);
};