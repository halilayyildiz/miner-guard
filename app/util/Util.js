var constants = require('./../conf/constants');

module.exports = {
    roundPrice: roundPriceBTC,
    roundPriceUSD: roundPriceUSD
}

function roundPriceBTC(price) {
    return parseFloat(price.toFixed(constants.WALLET_EARNING_BTC_DEAFULT_PRECISION_NUM));
}

function roundPriceUSD(price) {
    return parseFloat(price.toFixed(constants.WALLET_EARNING_USD_DEAFULT_PRECISION_NUM));
}