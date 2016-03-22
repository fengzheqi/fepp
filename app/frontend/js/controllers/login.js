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
                $http.post('/signin', $scope.user).success(function(user) {
                    $window.location.href = '/admin';
                }).error(function(data, status) {
                    $scope.signinMessage = '用户名或密码不正确.';
            })};

            $scope.signupModal = function() {
                $uibModal.open({
                    templateUrl: 'signup.html',
                    controller:  'SignupCtrl',
                    size: 'sm'
                });
            };
        }]);


angular.module('fepp')
    .controller('SignupCtrl', ['$scope', '$uibModalInstance', '$http', '$window',
        function($scope, $uibModalInstance, $http, $window) {
            $scope.user = {};
            $scope.signupMessage = '';
            $scope.signup = function() {
                $http.post('/signup', $scope.user).success(function() {
                    $window.location.href = '/admin';
                }).error(function(data) {
                    $scope.signupMessage = '邮箱已注册，请重试.';
                });
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
