//Service for user login
'use strict';
angular.module("myApp.services")
    .service('user', function($http){

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
        this.login = function(id, password, success, error){
            $http.post('api/user/login', {'id': id}).
                success(function(data) {
                    success(data);
                }).
                error(function(data) {
                    error(data);
                });

        };

});
