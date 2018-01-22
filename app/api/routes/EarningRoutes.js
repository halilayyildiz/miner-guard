var express = require('express');
var earningController = require('./../controllers/EarningController');

var router = express.Router();

router.route('/:userId/hourly').get(earningController.listHourlyEarning);
router.route('/erk').get(earningController.listHourlyEarning);

module.exports = router;