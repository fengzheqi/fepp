/**
 * Created by zheqi on 2016/1/25.
 */
'use strict';

angular.module('fepp')
    .factory('InterceptorService', ['$q','$location',function ($q, $location) {

    var ajaxInterceptor = {
        response: function (response) {
            return response || $q.when(response);
        },
        responseError: function (response) {
            if(response.status === 401) {
                $location.path('/');
            }
            return $q.reject(response);
        }
    };

    return ajaxInterceptor;
}]);