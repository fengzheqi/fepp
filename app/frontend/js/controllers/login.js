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
            $scope.signupMessage = '';
            $scope.isActive = false;

            /**
             * 切换登录与注册表单
             * @param $event 事件对象
             */
            $scope.changeOpt = function($event) {
                $event.stopPropagation();
                $scope.isActive = !$scope.isActive;
            };

            /**
             * 用户输入提示
             * @param name 输入名
             * @param $event 事件对象
             */
            $scope.toggleClass = function(name, $event) {
                if($event.currentTarget.value == '') {
                    $scope[name]=0;
                } else {
                    switch ($event.type) {
                        case 'keyup':   $scope[name] = 2; break;
                        case 'blur':    $scope[name] = 1; break;
                        case 'focus':   $scope[name] = 2; break;
                    }
                }
            };

            /**
             * 用户登陆
             */
            $scope.signin =function() {
                $http.post('/signin', $scope.user).success(function(user) {
                    $window.location.href = '/admin';
                }).error(function(data, status) {
                    $scope.signinMessage = '用户名或密码不正确.';
                });
            };

            /**
             * 用户注册
             */

            $scope.signup = function() {
                $http.post('/signup', $scope.user).success(function() {
                    $window.location.href = '/admin';
                }).error(function(data) {
                    $scope.signupMessage = '邮箱已注册，请重试.';
                });
            };
        }]);