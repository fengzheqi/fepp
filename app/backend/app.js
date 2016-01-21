/**
 * app.js
 * express主程序
 * Created by zheqi on 2016/1/18.
 */

'use strict';

/**
 * 定义变量
 */
var express     = require('express'),
    app         = express(),
    path        = require('path'),
    fs          = require('fs'),
    config      = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8'));

/**
 * 设置默认运行环境
 */
app.set('env', app.get('env') || 'development');

/**
 * 配置数据库环境
 */
require('./lib/database')(app.get('env'));

/**
 * 配置前台模板
 */
app.set('views', '../frontend/views');
app.set('viewe engine', 'ejs');


module.exports = app;