var dbManager = require('./../../db/DatabaseManager.js');
var currencyService = require('./../../service/CurrencyService.js');
var util = require('./../../util/Util.js');

exports.listHourlyEarning = async function(req, res) {

    let earningList = await dbManager.getUserHourlyEarnings(req.params.userId);

    let result = [];
    for (var i = 0; i < earningList.length - 1; i++) {
        result[i] = {
            "hour": earningList[i].hour,
            "earned": {
                "btc": util.roundPrice(earningList[i].earned - earningList[i + 1].earned),
                "usd": util.roundPriceUSD((earningList[i].earned - earningList[i + 1].earned) * currencyService.getBitcoinPrice()),
            },
            "total": earningList[i].earned,
        };
    }

    res.json(result);
};

exports.listDailyEarning = async function(req, res) {

    let earningList = await dbManager.getUserDailyEarnings(req.params.userId);

    let result = [];
    for (var i = 0; i < earningList.length - 1; i++) {
        result[i] = {
            "date": earningList[i].day,
            "earnedBTC": util.roundPrice(earningList[i].earned - earningList[i + 1].earned),
            "earnedUSD": util.roundPriceUSD((earningList[i].earned - earningList[i + 1].earned) * currencyService.getBitcoinPrice()),
            "earnedTotal": util.roundPrice(earningList[i].earned),
        }
    };
    res.json(result);
};