var poolService = require('./service/PoolService.js');
var dbManager = require('./db/DatabaseManager.js');
var minerGuard = require('./MinerGuard.js');

module.exports = {
    startup: startup
}

startup();

async function startup() {
    // connect to sqlite3 database
    await dbManager.connectDatabase();

    minerGuard.checkStatus();

    setInterval(function () {
        minerGuard.checkStatus()
    }, 5 * 60 * 1000); // 5 mins interval
}