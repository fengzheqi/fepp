'use strict'

(function() {

  var performace = {
    errors: []
  }

  /**
   * 检测浏览器的兼容性
   */
  if (window.performace.timing) {
    performace.navTiming = window.performace.timing;
  } else {
    performace.errors.push('你的浏览器不支持Navigation Timing API!');
  }

  /**
   * 获取用户的相关信息
   */
  performace.protocol = window.location.protocol;
  performace.host = window.location.host;
  performace.pathname = window.location.pathname;
  performace.userAgent = window.navigator.userAgent;
  performace.platform = window.navigator.platform;


  setTimeout(function() {
    /**
     * 判断页面是否加载完成
     */
    if(performace.navTiming.loadEventEnd - performace.navTiming.navigationStart < 0) {
      performace.errors.push('页面正在加载中...');
    }

    var elem = document.getElementById('feException');
    var serverHost = elem.src.split('/exception.js/')[0];
    var img = new Image(1,1);
    img.src = serverHost + '/_fp.gif?' + encodeURIComponent(JSON.stringify(performace));0
  }, 0);
})();

/**
 * DOM ID 重复检测
 */
var DOMReplicateIDDect = function() {
  var nodes = document.querySelectorAll('[id]');
  var ids = {};
  var totalNodes = nodes.length;

  for (var i = 0; i < totalNodes; i++) {
    var currentId = nodes[i].id ? nodes[i].id : 'undefined';
    if(isNaN(ids[currentId])) {
      ids[currentId] = 0;
    }
    ids[currentId]++;
  }

  var duplicateIDs = [];
  for (i in ids) {
    if(ids[i] >1) {
      duplicateIDs.push(i);
    }
  }

  if(duplicateIDs.length === 0) {
    return null;
  } else {
    return duplicateIDs;
  }
}

/**
 * DOM异常捕获，异常类型为 6
 */
 (function DOMException (){
     if(document.doctype == null || document.doctype == undefined){
         reportException(6, '未声明DOCTYPE', '', '', '');
     }
     var ids = DOMReplicateIDDect();
     if(ids != null && ids != undefined){
         reportException(6, 'ID重复:' + ids.toString(), '', '', 'ID重复:' + ids.toString());
     }
 })();


/**
 * Link收集并上传，异常类型为 4
 */
 (function (){
     var linkNodes = Array.prototype.slice.call(document.querySelectorAll("a"));
     //过滤掉功能性、锚、空的链接
     var valideLinkNodes = linkNodes.filter(function(ele){
         return !/^[#|javascript:]/.test(ele.getAttribute("href")) &&  /^[http|https]/.test(ele.href) && '' !== ele.getAttribute('href');
     });
     //返回链接数组并去重
     var linkArray = valideLinkNodes.map(function(ele){return ele.href});
     var linkArray2 = [];
     (function unique(arr, newArr) {
         var num;

         if (-1 == arr.indexOf(num = arr.shift())) newArr.push(num);

         arr.length && unique(arr, newArr);
     })(linkArray, linkArray2);
     reportException(4, '', '', '', linkArray2);
 })();
