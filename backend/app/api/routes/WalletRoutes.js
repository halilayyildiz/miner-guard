var express = require('express');
var walletController = require('./../controllers/WalletController');

var router = express.Router();

router.route('/add').get(walletController.addWalletToUser);
router.route('/remove').get(walletController.removeWalletFromUser);

module.exports = router;