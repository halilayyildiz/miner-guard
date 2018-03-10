var dbManager = require('./../../db/DatabaseManager.js');

exports.addWalletToUser = async function(req, res) {
    let result = "";
    try {
        result = await dbManager.addWalletToUser(req.params.userId, req.params.walletId)
    } catch (err) {
        console.log(`Unable to add wallet: ${req.params.walletId} to user: ${req.params.userId}; ${err}`);
        result = err;
    }
    res.json({ "result": result });
};

exports.removeWalletFromUser = async function(req, res) {
    let result = "";
    try {
        result = await dbManager.removeWalletFromUser(req.params.userId, req.params.walletId)
    } catch (err) {
        console.log(`Unable to remove wallet: ${req.params.walletId} from user: ${req.params.userId}; ${err}`);
        result = err;
    }
    res.json({ "result": result });
};