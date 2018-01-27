var express = require('express');
var earningController = require('./../controllers/EarningController');

var router = express.Router();

router.route('/:userId/hourly').get(earningController.listHourlyEarning);
router.route('/:userId/daily').get(earningController.listDailyEarning);

module.exports = router;