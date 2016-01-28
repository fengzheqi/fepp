/**
 * Created by zheqi on 2016/1/25.
 */
'use strict';

angular.module('fepp')
    .controller('LoginCtrl', ['$scope', '$uibModal', '$http', '$window', '$cookieStore',
        function($scope, $uibModal, $http, $window, $cookieStore) {

            var isRemembered = function ($q, $cookies, $http, $timeout, $location, $cookieStore) {
                var defered = $q.defer();
                if ($cookies.remember) {
                    $http.post('/signin').success(function() {
                        $timeout(function() {defered.reject();}, 0);
                        $location.url('/admin');
                    }).error(function(err, status) {
                        if (err && status === 401) {
                            $cookieStore.remove('remember');
                        }
                        timeout(defered.resolve, 0);
                    })
                } else {
                    $timeout(defered.resolve, 0);
                }
                return defered.promise;
            };

            $scope.user = {};
            $scope.signinMessage = '';
            $scope.signin =function() {
                $http.post('/signin', $scope.user).success(function() {
                    $window.location.href = '/admin';
                }).error(function(data, tentatives) {
                    $scope.signinMessage = tentatives + ' ，请重新输入！';
                });
            };

            $scope.signupModal = function() {
                $uibModal.open({
                    templateUrl: 'signup.html',
                    controller:  'SignupCtrl',
                    size: 'sm'
                });
            };
        }]);

//angular.module('fepp')
//    .controller('Signin', ['$scope', '$window', '$http',
//        function($scope, $window, $http) {
//            $scope.user = {};
//            $scope.signinMessage = '';
//            $scope.signin =function() {
//                $http.post('/signin', $scope.user).success(function() {
//                    $window.location.href = '/admin';
//                }).error(function(data, tentatives) {
//                    $scope.signinMessage = tentatives + ' ，请重新输入！';
//                });
//            };
//        }]);

angular.module('fepp')
    .controller('SignupCtrl', ['$scope', '$uibModalInstance', '$http', '$window',
        function($scope, $uibModalInstance, $http, $window) {
            $scope.user = {};
            $scope.signupMessage = '';
            $scope.signup = function() {
                $http.post('/signup', $scope.user).success(function() {
                    $window.location.href = '/admin';
                }).error(function(data) {
                    $scope.signupMessage = data;
                });
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
