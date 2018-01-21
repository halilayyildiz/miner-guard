var dbManager = require('./../../db/DatabaseManager.js');

exports.listHourlyEarning = async function(req, res) {

    console.log('listHourlyEarning');

    let earningList = await dbManager.getUserHourlyEarnings(req.userId);

    let result = [];
    for (var i = 0; i < earningList.length - 1; i++) {
        result[i].hour = earningList[i].hour;
        result[i].earning = earningList[i].earning - earningList[i + 1].earning;
    }

    res.json(result);
};