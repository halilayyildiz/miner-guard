var rp = require('request-promise');
var constants = require('./../conf/constants');
var dbManager = require('./../db/DatabaseManager.js');
var logger = require('./LoggingService.js');


module.exports = {
    getWalletStatus: getWalletStatus
};

var bitcoinPrice = 0;

async function getWalletStatus(wallet) {
    var walletURL = constants.POOL[wallet.pool].WALLET_URL + wallet.address;
    let status = {};
    try {
        let response = await rp(walletURL);
        let walletData = JSON.parse(response);
        status = parseWalletData(wallet.pool, walletData);
    } catch (err) {
        status = parseWalletData('UNDEFINED', '');
    }
    return status;
}

function parseWalletData(pool, data) {
    let walletData = {};

    if (pool == 'ZPOOL' || pool == 'ZERGPOOL') {
        walletData.total_earned = data.total;
        walletData.miner_count = data.miners.length;
    } else if (pool == 'AHASH') {
        walletData.total_earned = data.total_earned;
        walletData.miner_count = data.miners.length;
    } else {
        walletData.total_earned = 0;
        walletData.miner_count = 0;
    }

    return walletData;
}