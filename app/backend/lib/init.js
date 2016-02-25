'use strict';

var glob = require('glob');
var chalk = require('chalk');

module.exports = function() {
    if (glob.sync('./app/config/config.json', {nodir: true}).length) {
        console.log(chalk.black.bgWhite('Loading the config file successfully!'));
    } else {
        console.error(chalk.red('No config file! Please edit it before you start the application.'));
    }
}