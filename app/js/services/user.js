//Service for user login
'use strict';
angular.module("myApp.services")
    .service('user', ['$http', function($http){

        //signup
        this.signUp = function(username, password, success, error){
            $http.post('api/user/create', {'username': username, 'password': password}).
                success(function(data) {
                    success(data);
                }).
                error(function(data) {
                    error(data);
                });
        };

        //login -- email/display name, password,
        this.login = function(username, password, success, error){
            $http.post('api/user/login', {'username': username}).
                success(function(data) {
                    success(data);
                }).
                error(function(data) {
                    error(data);
                });

        };

        this.checkSession = function(username, password, success, error){
            $http.post('api/user/checkSession', {'username': username}).
                success(function(data) {
                    success(data);
                }).
                error(function(data) {
                    error(data);
                });

        };

}]);