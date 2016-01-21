/**
 * Created by zheqi on 2016/1/21.
 */
'use strict';

var mongoose    = require('mongoose'),
    express     = require('express'),
    router      = express.Router(),
    Model       = mongoose.model('Task');