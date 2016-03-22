/**
 * Created by zheqi on 2016/1/21.
 */
'use strict';

var path = require('path');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/config.json'), 'utf8'));

module.exports = function (mailToSend, firstname, key) {


    var template = {
        from: 'FEPP',
        to: mailToSend,
        subject: '欢迎您注册FEPP',
        text: '',
        html: '<h1>感谢您加入 FEPP !</h1>\n'+
        '<p>您好 '+firstname+', 欢迎您加入FEPP监控平台。 请点击以下链接完成您的账号激活操作。</p>\n'+
        '如果您没有注册过FEPP，或没有进行上述操作，请'+
        '<a href="http://'+config.production.host+':'+config.production.port+'/unvalidate?email='+mailToSend+'&key='+key+'">'+
        '点击这里</a> 取消.</p><br>\n'+
        '<a href="http://'+config.production.host+':'+config.production.port+'/validate?key='+key+'">点击这里激活您的账号</a>'
    };


    return template;


};
