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
    passport    = require('passport'),
    flash           = require('connect-flash'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
    csrf 			= require('csurf'),
    path        = require('path'),
    fs          = require('fs'),
    nodemailer  = require('nodemailer'),
    config      = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8')),
    strategiesDir 	= fs.readdirSync(path.join(__dirname, './lib/strategies')),
    modelsDir		= fs.readdirSync(path.join(__dirname, './models'));

/**
 * 配置默认运行环境
 */
app.set('env', app.get('env') || 'development');

/**
 * 配置邮件服务器
 *
 */
var transporter = nodemailer.createTransport(config[app.get('env')].mail);

/**
 * 配置数据库环境
 */
require('./lib/database')(app.get('env'));

/**
 * 注入所有的model文件
 *
 */
modelsDir.forEach(function (file) {
    if (file.indexOf('.js') >-1) {
        require('./models/' + file);
    }
});

/**
 * 配置passport策略
 *
 */
strategiesDir.forEach(function (file) {
    if (file.indexOf('.js') >-1) {
        require('./lib/strategies/'+file)(app.get('env'), passport, transporter);
    }
});

/**
 * 配置前台模板
 */
app.set('views', '../frontend/views');
app.set('viewe engine', 'ejs');

/**
 * 配置cookie
 *
 */
app.use(cookieParser(config[app.get('env')].cookieSecret, { httpOnly: true }));

/**
 * 配置bodyParser
 *
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * 配置session
 *
 */
app.use(session({
    name: 'sessionID',
    secret: config[app.get('env')].sessionSecret,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 2*60*60*1000
    },
    rolling: true,
    resave: false,
    saveUninitialized: true
}));



/**
 * 初始化并启动passport
 *
 */
app.use(passport.initialize());

/**
 * passport利用express的session来追踪用户的session信息
 *
 */
app.use(passport.session());

/**
 * 配置flash中间件
 *
 */
app.use(flash());

/**
 * 配置 CSRF 保护
 *
 */
app.use(csrf());

/**
 * Create a token called 'XSRF-TOKEN' with value managed by csrf middleware.
 * Send the token in every request results
 *
 * More info here : http://stackoverflow.com/a/27426757/2904349
 *
 */
app.use(function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
});

/**
 * 配置后端路径
 *
 */
require('./router')(app, passport);

module.exports = app;