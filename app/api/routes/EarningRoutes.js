var express = require('express');
var router = express.Router();

var earningController = require('./../controllers/EarningController');

router.route('/:userId/earning/hourly').get(earningController.listHourlyEarning);

router.route('/erk')
  .get(earningController.listHourlyEarning);