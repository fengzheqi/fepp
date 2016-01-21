/**
 * Created by zheqi on 2016/1/21.
 */
'use strct';

/**
 * 定义变量
 */
var path        = require('path'),
    fs          = require('fs'),
    routesDir   = fs.readdirSync(path.join(__dirname, './routes')),
    authDir     = fs.readdirSync(path.join(__dirname, './auth'));

var isLoggedIn = function(req, res, next) {
    if (!req,isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
}

var ExpressRouter = function(app, passport) {
    routesDir.forEach(function(fileName) {
        if (fileName.indexOf('.js') > -1) {
            var routeName = fileName.substr(0, fileName.length-3);
            app.use('/'+routeName, require('./routes/' + routeName)(isLoggedIn()));
        }
    });

    authDir.forEach(function(fileName) {
        if (fileName.indexOf('.js') > -1) {
            var authName = fileName.substr(0, fileName.length-3);
            app.use('/', require('./auth/' + authName)(passport));
        }
    })
}

module.exports = ExpressRouter;