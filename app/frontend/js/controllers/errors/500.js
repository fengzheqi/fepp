/**
 * Created by zheqi on 2016/1/30.
 */
'use strict';

angular.module('fepp')
    .controller('500Ctrl', ['$rootScope', '$scope', function($rootScope, $scope) {
        $rootScope.pageTitle = '500 Error';
        $scope.errorMessage = 'Internal server error.';
    }]);