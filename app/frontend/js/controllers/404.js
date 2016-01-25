/**
 * Created by zheqi on 2016/1/25.
 */
'use strict';

angular.module('fepp')
    .controller('404Ctrl', ['$rootScope', '$scope', function($rootScope, $scope) {
        $rootScope.pageTitle = '404 Error';
        $scope.errorMessage = 'Sorry, but the requested page doesn\'t exist !';
    }]);