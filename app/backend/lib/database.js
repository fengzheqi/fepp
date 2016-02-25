/**
 * database.js
 * 数据库连接配置
 * Created by zheqi on 2016/1/18.
 */

'use strict';

/**
 * 定义变量
 */
var path        = require('path'),
    fs          = require('fs'),
    config      = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/config.json'))),
    mongoose    = require('mongoose');

/**
 * 连接MongoDB
 * @param env 系统环境
 */
var db = function (env) {
    mongoose.connect(
        'mongodb://' +
        config[env].database.user +
        ':' + config[env].database.password +
        '@' + config[env].database.host +
        ':' + config[env].database.port +
        '/' + config[env].database.name
    );
    var connection = mongoose.connection;
    connection.on('error', console.error.bind(console, 'MongoDB连接失败！'));
    connection.once('open', function callback() {
        console.log('成功连接至MongoDB！');
    })
}

/**
 * 暴露对外接口
 * @type {Function}
 */
module.exports = db;