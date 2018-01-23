const sqlite3 = require('sqlite3').verbose();
var moment = require('moment');
var moment = require('moment-timezone');
var User = require('./../model/user.js');
var Wallet = require('./../model/wallet.js');

module.exports = {
    connectDatabase: connectDatabase,
    getAllUsers: getAllUsers,
    getUserWallets: getUserWallets,
    getUserHourlyEarnings: getUserHourlyEarnings,
    updateWalletTotalEarning: updateWalletTotalEarning,
    updateUserTotalEarning: updateUserTotalEarning
}

let db;

function connectDatabase() {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database('./app/db/miner.db', (err) => {
            if (err) {
                console.error(err.message);
                return reject(err);
            }
            console.log('Connected to the miner database.');
            return resolve();
        });
    })
}

function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM user ORDER BY id', [], (err, rows) => {
            if (err) {
                return reject(err)
            }

            let result = [];
            for (let i = 0; i < rows.length; i++) {
                result[i] = new User(rows[i].ID, rows[i].NAME, rows[i].EMAIL, rows[i].PHONE, rows[i].MINER_COUNT);
            }

            return resolve(result);
        })
    })
}

function getUserWallets(userId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM wallet WHERE user_id = ?', [userId], (err, rows) => {
            if (err) {
                return reject(err)
            }

            let result = [];
            for (let i = 0; i < rows.length; i++) {
                result[i] = new Wallet(rows[i].ADDRESS, rows[i].USER_ID, rows[i].TOTAL_EARNED);
            }

            return resolve(result);
        })
    })
}

function getUserHourlyEarnings(userId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT substr(DATETIME, 1, 13) AS DATE_HOUR, MAX(TOTAL_EARNING) AS EARNED FROM USER_EARNING WHERE USER_ID = ? GROUP BY DATE_HOUR ORDER BY DATE_HOUR desc', [userId], (err, rows) => {
            if (err) {
                return reject(err)
            }

            var result = [];

            for (let i = 0; i < rows.length; i++) {
                var test = {
                    "hour": rows[i].DATE_HOUR,
                    "earned": rows[i].EARNED
                };
                result[i] = test;
            }

            return resolve(result);
        })
    })
}

function updateWalletTotalEarning(walletAddress, walletData) {
    db.run("UPDATE WALLET SET TOTAL_EARNED = ? WHERE ADDRESS = ?", [walletData.total_earned, walletAddress]);
    console.log('Wallet ' + walletAddress + ' total earned updated: ' + walletData.total_earned);
}

function updateUserTotalEarning(user, totalEarning) {
    var datetime = moment().tz('Europe/Istanbul').format("YYYY-MM-DD HH:mm:ss.SSS");

    db.run("INSERT INTO USER_EARNING(USER_ID, TOTAL_EARNING, DATETIME) VALUES(?,?,?)", [user.id, totalEarning, datetime]);
    console.log('User ' + user.name + ' earning updated: ' + totalEarning + " @" + datetime);
}