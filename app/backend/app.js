/**
 * app.js
 * express配置主文件
 * Created by zheqi on 2016/1/18.
 */

'use strict';

/**
 * 变量声明
 */
var express     = require('express'),
    app         = express(),
    path        = require('path'),
    fs          = require('fs'),
    config      = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8'));

/**
 * 配置运行环境
 */
app.set('env', app.get('env') || 'development');

/**
 * 配置数据库
 */
require('./lib/database')(app.get('env'));


module.exports = app;