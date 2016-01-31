/**
 * Created by zheqi on 2016/1/30.
 */
'use strict';

angular.module('fepp')
    .controller('403Ctrl', ['$rootScope', '$scope', function($rootScope, $scope) {
        $rootScope.pageTitle = '403 Error';
        $scope.errorMessage = 'You are not authorized to view this page.';
    }]);