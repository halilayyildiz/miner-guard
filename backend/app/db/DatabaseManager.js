const sqlite3 = require('sqlite3').verbose();
var moment = require('moment-timezone');
var logger = require('./../service/LoggingService.js');
var User = require('./../model/user.js');
var Wallet = require('./../model/wallet.js');

module.exports = {
    connectDatabase: connectDatabase,
    getAllUsers: getAllUsers,
    getUser: getUser,
    getUserWallets: getUserWallets,
    getUserHourlyEarnings: getUserHourlyEarnings,
    getUserDailyEarnings: getUserDailyEarnings,
    updateWalletTotalEarning: updateWalletTotalEarning,
    updateUserTotalEarning: updateUserTotalEarning,
    updateBitcoinPrice: updateBitcoinPrice,
    getBitcoinPrice: getBitcoinPrice
}

let db;

function connectDatabase() {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database('./app/db/miner.db', (err) => {
            // db = new sqlite3.Database('./backend/app/db/miner.db', (err) => {
            if (err) {
                console.error(err.message);
                return reject(err);
            }
            console.log('Connected to the miner database.');
            return resolve();
        });
    })
}

function getUser(userId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM user WHERE id = ? ORDER BY id', [userId], (err, row) => {
            if (err) {
                return reject(err)
            }

            let result = new User(row.ID, row.NAME, row.EMAIL, row.PHONE, row.MINER_COUNT);
            return resolve(result);
        })
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

function getUserDailyEarnings(userId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT substr(DATETIME, 1, 10) AS DATE_DAY, MAX(TOTAL_EARNING) AS EARNED FROM USER_EARNING WHERE USER_ID = ? GROUP BY DATE_DAY ORDER BY DATE_DAY desc', [userId], (err, rows) => {
            if (err) {
                return reject(err)
            }

            var result = [];

            for (let i = 0; i < rows.length; i++) {
                var test = {
                    "day": rows[i].DATE_DAY,
                    "earned": rows[i].EARNED
                };
                result[i] = test;
            }

            return resolve(result);
        })
    })
}

function updateWalletTotalEarning(walletAddress, totalEarned) {
    db.run("UPDATE WALLET SET TOTAL_EARNED = ? WHERE ADDRESS = ?", [totalEarned, walletAddress]);
    logger.log('WALLET UPDATE', walletAddress + ' : ' + totalEarned)
}

function updateUserTotalEarning(user, totalEarned) {
    var datetime = moment().tz('Europe/Istanbul').format("YYYY-MM-DD HH:mm:ss.SSS");

    db.run("INSERT INTO USER_EARNING(USER_ID, TOTAL_EARNING, DATETIME) VALUES(?,?,?)", [user.id, totalEarned, datetime]);
    logger.log('EARNING UPDATE', user.name + ' : ' + totalEarned);
}

function updateBitcoinPrice(price_usd) {
    var date = moment().tz('Europe/Istanbul').format("YYYY-MM-DD");

    db.run("INSERT OR REPLACE INTO BITCOIN_PRICE(DATE, PRICE_USD) VALUES(?,?)", [date, price_usd]);
    logger.log('BITCOIN PRICE UPDATE : ', price_usd);
}

function getBitcoinPrice(date) {
    return new Promise((resolve, reject) => {
        db.get('SELECT PRICE_USD FROM BITCOIN_PRICE WHERE date = ?', [date], (err, row) => {
            if (err) {
                return reject(err)
            }

            let result = undefined;
            if (row) {
                result = row.PRICE_USD;
            }

            return resolve(result);
        })
    })
}