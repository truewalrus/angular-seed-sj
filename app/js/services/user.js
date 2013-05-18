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
            $http.post('api/user/login', {'username': username, 'password': password}).
                success(function(data) {
                    success(data);
                }).
                error(function(data) {
                    error(data);
                });

        };

        this.checkSession = function(success, error){
            $http.post('api/user/checkSession').
                success(function(data) {
                    success(data);
                }).
                error(function(data) {
                    error(data);
                });

        };
		
		this.logout = function(success, error) {
			$http.get('api/user/logout').
				success(function(data) {
					success(data);
				}).
				error(function(data) {
					error(data);
				});
		};
		
		
		this.deleteLoggedIn = function(success, error) {
			$http.get('api/user/delete').
				success(function(data) {
					success(data);
				}).
				error(function(data) {
					error(data);
				});
		};

}]);
