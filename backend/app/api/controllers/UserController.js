var dbManager = require('./../../db/DatabaseManager.js');
var currencyService = require('./../../service/CurrencyService.js');
var util = require('./../../util/Util.js');

exports.getAllUsers = async function(req, res) {
    let userList = await dbManager.getAllUsers();
    res.json(userList);
};

exports.getUser = async function(req, res) {
    let user = await dbManager.getUser(req.params.userId);
    res.json(user);
};