var dbManager = require('./../../db/DatabaseManager.js');

exports.addWalletToUser = async function(req, res) {
    let result = "";
    try {
        let wallet = {
            'userId': req.query.userId,
            'address': req.query.address,
            'pool': req.query.pool
        };

        result = await dbManager.addWalletToUser(wallet)
    } catch (err) {
        console.log(`Unable to add wallet: ${req.params.pool}-${req.params.walletId} to user: ${req.params.userId}; ${err}`);
        result = err;

    }
    res.json({
        "result": result
    });
};

exports.removeWalletFromUser = async function(req, res) {
    let result = "";
    try {
        let wallet = {
            'userId': req.query.userId,
            'address': req.query.address,
            'pool': req.query.pool
        };

        result = await dbManager.removeWalletFromUser(wallet)
    } catch (err) {
        console.log(`Unable to remove wallet: ${req.params.pool}-${req.params.walletId} from user: ${req.params.userId}; ${err}`);
        result = err;
    }
    res.json({
        "result": result
    });
};