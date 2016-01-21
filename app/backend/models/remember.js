/**
 * Created by zheqi on 2016/1/21.
 */
'use strict'

var mongoose = require('mongoose');

var rememberSchema = mongoose.Schema({
    login: {type: String},
    serial_id: {type: String},
    token: {type: String}
});

mongoose.model('Remember', rememberSchema, '_remember_tokens');