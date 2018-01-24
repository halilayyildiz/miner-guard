var dbManager = require('./../../db/DatabaseManager.js');

exports.listHourlyEarning = async function(req, res) {

    let earningList = await dbManager.getUserHourlyEarnings(req.params.userId);

    let result = [];
    for (var i = 0; i < earningList.length - 1; i++) {
        result[i] = {
            "hour": earningList[i].hour,
            "earned": (earningList[i].earned - earningList[i + 1].earned),
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
            "day": earningList[i].day,
            "earned": (earningList[i].earned - earningList[i + 1].earned),
            "total": earningList[i].earned,
        };
    }

    res.json(result);
};