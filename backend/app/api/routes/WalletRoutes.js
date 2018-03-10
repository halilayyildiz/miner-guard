var express = require('express');
var walletController = require('./../controllers/WalletController');

var router = express.Router();

router.route('/add/:walletId/toUser/:userId').get(walletController.addWalletToUser);
router.route('/remove/:walletId/fromUser/:userId').get(walletController.removeWalletFromUser);

module.exports = router;