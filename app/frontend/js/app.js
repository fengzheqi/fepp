/**
 * Created by zheqi on 2016/1/20.
 */
'use strict';

var app = angular.module('fepp', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ui.bootstrap'
]);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {
        var isLoggerIn = function($q, $timeout, $http, $rootScope, $location) {
            var deferred = $q.defer();
            $http.get('/signedin').success(function(user) {
                if (user != '0') {
                    $rootScope.isSignedIn = true;
                    $rootScope.currentUser = user;
                    $timeout(deferred.resolve, 0);
                } else {
                    $rootScope.isSignedIn = false;
                    $rootScope.currentUser = {};
                    $timeout(function(){deferred.reject();}, 0);
                    $location.url('/');
                }
            });
            return deferred.promise;
        };

        $httpProvider.interceptors.push('InterceptorService');

        $routeProvider
            .when('/', {
                templateUrl: 'views/login_temp.ejs',
                controller: 'MainCtrl'
            })
            .when('/404', {
                templateUrl: 'views/errors/404.ejs',
                controller: '404Ctrl'
            })
            .when('/403', {
                templateUrl: 'views/errors/403.ejs',
                controller: '403Ctrl'
            })
            .when('/500', {
                templateUrl: 'views/errors/500.ejs',
                controller: '500Ctrl'
            })
            .when('/admin', {
                templateUrl: 'views/admin.ejs',
                controller: 'AdminCtrl',
                resolve: {loggedin: isLoggerIn}
            })
            .when('/validate', {
                templateUrl: 'views/mail.ejs',
                controller: 'ValidateCtrl'
            })
            .when('/unvalidate', {
                templateUrl: 'views/mail.html',
                controller: 'ValidateCtrl'
            })
            .otherwise({
                redirctorTo: '/404'
            });

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
]);


//Then define the init function for starting up the application
angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['fepp']);
});


