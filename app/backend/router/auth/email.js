/**
 * Created by zheqi on 2016/1/22.
 */
'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = function () {


    /**
     * 验证email
     *
     */
    router.get('/validate', function (req, res) {
        User.findOne({ emailKey: req.query.key }, function (err, user) {
            if (err || !user) { return res.redirect('/404'); }
            if (user.emailConfirm === true) {
                return res.redirect('/403');
            }
            else {
                User.update({ emailKey: req.query.key }, { emailConfirm: true }, { multi: true }, function (err, numAffected) {
                    if (err) {return res.redirect('/404');}
                    if (numAffected === 1) {res.sendStatus(200);}
                    else {res.sendStatus(500);}
                });
            }
        });

    });


    /**
     * 没有验证email
     *
     */
    router.get('/unvalidate', function (req, res) {
        User.findOne({emailKey: req.query.key, email: req.query.email}, function (err, user) {
            if (err || !user) { return res.redirect(404, '/404'); }
            if (user.emailConfirm === true) {
                return res.redirect(403, '/403');
            }
            else {
                User.remove({ _id: user._id}, function (err) {
                    if (err) { return res.redirect(404, '/404'); }
                    res.sendStatus(200);
                });
            }
        });
    });

    return router;

};
