/**
 * Created by zheqi on 2016/1/28.
 */
angular.module('fepp')
    .controller('AdminCtrl', ['$rootScope', '$scope',
        function($rootScope, $scope) {
            $rootScope.pageTitle = '监控平台';
        }
    ])