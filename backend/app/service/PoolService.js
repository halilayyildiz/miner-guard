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

    let response = await rp(walletURL)
        .catch(err => {
            console.log(err);
            throw new Error("Unable to fetch wallet data !!!");
        });

    let walletData = JSON.parse(response);
    return parseWalletData(wallet.pool, walletData);
}

function parseWalletData(pool, data) {
    let walletData = {};

    if (pool == 'ZPOOL') {
        walletData.total_earned = data.total;
        walletData.miner_count = data.miners.length;
    } else if (pool == 'AHASH') {
        walletData.total_earned = data.total_earned;
        walletData.miner_count = data.miners.length;
    }

    return walletData;
}