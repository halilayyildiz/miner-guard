var rp = require('request-promise');
var dbManager = require('./../db/DatabaseManager.js');
var constants = require('./../conf/constants');

module.exports = {
    getWalletStatus: getWalletStatus
};

var bitcoinPrice = 0;

async function getWalletStatus(walletAddress) {
    var walletURL = constants.AHASHPOOL_WALLET_SERVICE_PREFIX + walletAddress;

    let response = await rp(walletURL)
        .catch(err => {
            console.log(err);
            throw new Error("Unable to fetch wallet data !!!");
        });

    let walletData = JSON.parse(response);
    return walletData;
}