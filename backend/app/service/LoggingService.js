var constants = require('./../conf/constants');
var moment = require('moment-timezone');

module.exports = {
    log: logInfo
};

function logInfo(operation, message) {
    var datetime = moment().tz('Europe/Istanbul').format("YYYY-MM-DD HH:mm:ss.SSS");
    console.log(datetime + ' - ' + operation + ' : ' + message);
}