/**
 * Created by zheqi on 2016/1/28.
 */
angular.module('fepp')
    .controller('AdminCtrl', ['$rootScope',
        function($rootScope) {
            $rootScope.pageTitle = '监控平台';
        }
    ])