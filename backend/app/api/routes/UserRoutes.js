var express = require('express');
var userController = require('./../controllers/UserController');

var router = express.Router();

router.route('/all').get(userController.getAllUsers);
router.route('/:userId').get(userController.getUser);

module.exports = router;