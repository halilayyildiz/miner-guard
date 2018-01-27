var dbManager = require('./db/DatabaseManager.js');
var poolService = require('./service/PoolService.js');
var currencyService = require('./service/CurrencyService.js');
var User = require('./model/user.js');
var Wallet = require('./model/wallet.js');

module.exports = {
    checkStatus: checkStatus,
    startup: startup
}

async function startup() {
    // connect to sqlite3 database
    await dbManager.connectDatabase();

    checkStatus();

    setInterval(function() {
        checkStatus()
    }, 5 * 60 * 1000); // 5 mins interval
}

async function checkStatus() {

    // update bitcoin price
    await currencyService.refreshBitcoinPrice();

    // get users
    let users = await getUserWithWallets();

    // for each user
    for (var i = 0; i < users.length; i++) {
        users[i].totalEarning = 0;
        users[i].activeMinerCount = 0;
        for (var j = 0; j < users[i].wallets.length; j++) {
            try {
                let walletData = await poolService.getWalletStatus(users[i].wallets[j].address)
                    .catch(err => {
                        console.log(err);
                    });

                if (walletData.balance) {
                    // update miner earnings
                    dbManager.updateWalletTotalEarning(users[i].wallets[j].address, walletData.total_earned);

                    users[i].totalEarning += walletData.total_earned;
                    users[i].activeMinerCount += walletData.miners.length;
                }
            } catch (error) {
                console.log(err);
                continue;
            }
        }

        // update user total earning
        dbManager.updateUserTotalEarning(users[i], users[i].totalEarning);

        // is all miners working ? if not send notification
        if (users[i].activeMinerCount < users[i].minerCount) {
            console.log('USER ' + users[i].name + ' MINER DOWN !!!');
            // send notification to owner
            // TODO
        }
    }
}

async function getUserWithWallets() {

    let userList = await dbManager.getAllUsers();

    let wallets = [];
    for (var i = 0; i < userList.length; i++) {
        // get user wallets
        wallets = await dbManager.getUserWallets(userList[i].id);
        userList[i].wallets = [];
        for (let j = 0; j < wallets.length; j++) {
            userList[i].wallets[j] = wallets[j];
        }
    }

    return userList;
}