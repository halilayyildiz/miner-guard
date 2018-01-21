var dbManager = require('./db/DatabaseManager.js');
var poolService = require('./service/PoolService.js');
var User = require('./model/user.js');
var Wallet = require('./model/wallet.js');

module.exports = {
    checkStatus: checkStatus
}

async function checkStatus() {
    let users = await getUserWithWallets();

    for (var i = 0; i < users.length; i++) {
        users[i].totalEarning = 0;
        users[i].activeMinerCount = 0;
        for (var j = 0; j < users[i].wallet.length; j++) {
            let walletData = await poolService.getWalletStatus(users[i].wallet[j].address);

            // update miner earnings
            dbManager.updateWalletTotalEarning(users[i].wallet[j].address, walletData);

            users[i].totalEarning += walletData.total_earned;
            users[i].activeMinerCount += walletData.miners.length;
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
    // console.log(userList);

    let wallets = [];
    for (var i = 0; i < userList.length; i++) {
        // get user wallets
        wallets[i] = await dbManager.getUserWallets(userList[i].id);
        userList[i].wallet = wallets[i];
    }
    // console.log(wallets);

    return userList;
}