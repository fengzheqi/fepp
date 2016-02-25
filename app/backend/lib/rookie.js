/**
 * Rookie.js v0.0.2
 * Copyright (c) 2015 wangyi xujiangwei
 */

'use strict';

/**
 * 性能采集脚本
 */
(function() {
    var rookie = {
        errs: []
    };

    /*浏览器支持检测*/
    if (window.performance.timing) {
        rookie.navTiming = window.performance.timing;
    } else {
        rookie.errs.push('浏览器不支持Navigation Timing API！');
    }

    //获取用户相关信息
    rookie.pathname = window.location.pathname;
    rookie.appHost = window.location.host;
    rookie.userAgent = window.navigator.userAgent;
    rookie.platform = window.navigator.platform;

    /*向监测平台发送采集数据*/
    setTimeout(function() {
        //检测页面是否加载完成
        if (rookie.navTiming.loadEventEnd - rookie.navTiming.navigationStart < 0) {
            rookie.errs.push('页面还在加载中，获取数据失败！');
        }

        var elem = document.getElementById('feException');
        var serverHost = elem.src.split('/bookie.js/')[0];

        var img = new Image(1,1);
        img.src = serverHost + '/img/_fp.gif?' + encodeURIComponent(JSON.stringify(rookie));
    }, 0);
})();