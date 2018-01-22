var dbManager = require('./../../db/DatabaseManager.js');

exports.listHourlyEarning = async function(req, res) {

    let earningList = await dbManager.getUserHourlyEarnings(req.params.userId);

    let result = [];
    for (var i = 0; i < earningList.length - 1; i++) {
        result[i] = {};
        result[i].hour = earningList[i].hour;
        result[i].totalEarned = earningList[i].earned;
        result[i].diff = (earningList[i].earned - earningList[i + 1].earned);
    }

    res.json(result);
};