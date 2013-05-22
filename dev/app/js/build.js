'use strict';


// Declare app level module which depends on filters, and services

var app = angular.module('myApp', ['myApp.filters', 'myApp.directives', 'myApp.services', 'myApp.controllers', 'ngCookies']);
 app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	// angular front end routes
	$routeProvider.when('/view1', {templateUrl: 'partials/partial1.html'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
	$routeProvider.when('/sign-in', {templateUrl: 'partials/sign-in.html'});
    $routeProvider.otherwise({redirectTo: '/view1'});
	
	// fix to remove '#' from url strings in browser
	/*
		IE 10 is oldest IE that html5mode will work on
	*/
	$locationProvider.html5Mode(true);
  }]);

app.run(['$rootScope', function($rootScope) {
    $rootScope.$safeApply = function(fn) {
        fn = fn || function() {};
        if(this.$$phase) {
            fn();
        }
        else {
            this.$apply(fn);
        }
    };
}]);

//These need to be defined here in order for the module names to be succesfully reused
//All non-3rd party modules should be defined as angular.module('myApp.[type]').[type]
angular.module('myApp.services', []);
angular.module('myApp.filters', []);
angular.module('myApp.directives',[]);
angular.module('myApp.controllers', []);

'use strict';

angular.module("myApp.controllers").controller('SignInCtrl', ['$scope','user', function($scope, iUser){
	
	$scope.signingIn = true;
	$scope.userName = '';
	$scope.user = {};
	$scope.loggedIn = false;

    $scope.$on('userLoggedIn', function() {
        $scope.loggedIn = true;
        $scope.userName = iUser.getUser().username;
        console.log(iUser.getUser());
    });
	
	var clearUser = function(clearPassOnly) {
		if (clearPassOnly) {
			$scope.user.pw = '';
		}
		else {
			$scope.user = {};
		}
	};
	
	var clearErrMsg = function() {
		$scope.errMsg = null;
	};
	
	var checkSession = function() {
		iUser.checkSession(
			function(data) {
				$scope.loggedIn = true;
				$scope.userName = data.username;
			},
			function(data) {
				$scope.loggedIn = false;
			}
		);
	};
	checkSession();
	
	$scope.showSignIn = function() {
		clearErrMsg();
		$scope.signingIn = true;
		
		console.log('sign in true');
		
		clearUser();
	};
	
	$scope.showSignUp = function() {
		clearErrMsg();
		$scope.signingIn = false;
		
		console.log('sign in false');
		
		clearUser();
	};
	
	$scope.signIn = function() {
		clearErrMsg();
		console.log('%cSigning In', "color: red;font-weight:bold;");
		console.log('- Username: ' + $scope.user.username);
		console.log('- Password: ' + $scope.user.pw);
		
		iUser.login($scope.user.username, $scope.user.pw, function(data) {
			console.log('logged in!');
			$scope.loggedIn = true;
			$scope.userName = data.username;
			clearUser();
		},
		function(data) {
			console.log('login failed!');
			$scope.errMsg = data;
			clearUser(true);
		});
	};
	
	$scope.signUp = function() {
		clearErrMsg();
		console.warn('signUp');
		console.log('username: ' + $scope.user.username);
		console.log('password: ' + $scope.user.pw);
		
		iUser.signUp($scope.user.username, $scope.user.pw, function(data) {
			console.log('added %s', data.username);
			clearUser();
		},
		function(data) {
			console.log('failed to add user');
			$scope.errMsg = data;
			clearUser(true);
			console.log(data);
		});
	};
	
	$scope.logOut = function() {
		iUser.logout(
			function() {
				console.warn('logout successful!');
				$scope.userName = '';
				$scope.loggedIn = false;
			},
			function() {
				console.warn('logout failed!');
			}
		);
	};
	
	$scope.deleteUser = function() {
		iUser.deleteLoggedIn(
			function(data) {
				console.log(data.message);
				checkSession();
				clearUser();
				clearErrMsg();
			},
			function(data) {
				console.log(data.message);
			}
		);
	};
	
}]);
'use strict';

/* Controllers */

function MyCtrl1($scope, $cookies, Facebook){
/*var MyCtrl1 = ['$scope', 'Facebook', function($scope, Facebook) {
/*	$scope.test = "test";
$scope.alerts = [
    { type: 'error', msg: 'Oh snap! Change a few things up and try submitting again.' }, 
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: "Another alert!"});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  
      $scope.multiCheck = [
        {text: "Is Brandon cool?", value: false},
        {text: "Is Jon cool?", value: false},
        {text: "Is this true?", value: true}
    ];
    console.log($scope.multiCheck[1].value);
    $scope.testModel =  "test";

    $scope.userType = 'guest';*/
	//$rootScope.Facebook = 'Facebook';
	/*$scope.login = Facebook.login;
	$scope.logout = function(){
		Facebook.logout();
	}
	*/
	$scope.Facebook = Facebook;

    $scope.fbLogin = function() { Facebook.login($scope); };
    $scope.fbLogout = function() { Facebook.logout($scope); };

    $scope.accessToken = $cookies.cookieValue;

    $scope.$watch('Facebook.fbResponse', function(newVal) {
        console.debug("Watched value changed.");
        $cookies.cookieValue = newVal ? newVal.accessToken : '';
        $scope.accessToken = $cookies.cookieValue;
    });

    $scope.changeCookie = function() {
        $cookies.cookieValue = "Hello World!";
    };
}
MyCtrl1.$inject = ['$scope', '$cookies', 'Facebook'];


function MyCtrl2($scope, user, $http) {

    $scope.multiCheck = [
        {text: "Is Brandon cool?", value: false},
        {text: "Is Jon cool?", value: false},
        {text: "Is this true?", value: true}
    ];
    console.log($scope.multiCheck[1].value);
    $scope.testModel =  "test";

    $scope.userType = 'guest';
	
	$scope.login = function() {
        user.login('rekursiv', 'hunter3',
        function(data){
            console.log(data);
        },
        function(data){
            console.log(data);
        });
    };


    $scope.signUp = function(){
        user.signUp($scope.username, $scope.password,
            function(data){
                console.log(data);
            },
            function(data){
                console.log(data);
            });
    };


    $scope.checkSession = function(){
        user.checkSession( function(data){
                console.log(data);
            },
            function(data){
                console.log(data);
            });
    };
	
	$scope.logoutUser = function() {
		user.logout( function(data) {
			console.log(data);
		},
		function(data) {
			console.log(data);
		});
	};

	$scope.timepicker = {
		"time": ""
	};

    $scope.username = '';
    $scope.password = '';

    $scope.middleware = function() {
        $http.post('api/middleware', {'username': $scope.username, 'password': $scope.password});
    };
}
MyCtrl2.$inject = ['$scope', 'user', '$http'];

'use strict';

/* Directives */


angular.module('myApp.directives').
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

  
'use strict';

/* Filters */

angular.module('myApp.filters').
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);

/*Service for getting facebook login*/

'use strict';
angular.module('myApp.services')
.service('Facebook', ['$q', '$timeout', function($q, $timeout){

	//setting a variable for response from facebook
	this.fbResponse	= '';
	
	/**
	* Service method for logging into facebook. Facebook.login();
	*
	* @method login
	*/
	this.login = function(scope){
        console.debug("Logging into Facebook.");
        //$q.defer sets up an asynchronous promise
		var resp = $q.defer();

        //FB.login is Facebook's api login method, returns various information which is stored in resp
		FB.login(function(response) {
            scope.$safeApply(function() {
                console.debug(scope);
                resp.resolve(response.authResponse);
            });
            /*if (scope.$$phase) {
                resp.resolve(response.authResponse);
            }
            else {
                scope.$apply(function() {
                    resp.resolve(response.authResponse);
                });
            }*/

            FB.api('/me', function(response) {
                console.info("(Facebook) Logged in as %s", response.name);
            });

            console.debug("Facebook logged in.");
		});

        //set the variable for the response
		this.fbResponse = resp.promise;
	};
	
	this.logout = function(scope){
//$q.defer sets up an asynchronous promise
        console.debug("Logging out of Facebook.");
        var resp = $q.defer();

        //FB.login is Facebook's api login method, returns various information which is stored in resp
        FB.logout(function(response) {
            if (scope.$$phase) {
                resp.resolve(response.authResponse);
            }
            else {
                scope.$apply(function() {
                    resp.resolve(response.authResponse);
                });
            }

            console.debug("Facebook logged out.");
        });

        //set the variable for the response
        this.fbResponse = null;
	};
}]);

//Facebook necessary api methods
window.fbAsyncInit = function() {
	FB.init({
        //appId is obtained through Facebook's create an App setup. This will change per project
		appId: '281909378612016'
	});
};

// Load the Facebook SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));
'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services').value('version', '0.1');


//Service for user login
'use strict';
angular.module("myApp.services")
    .service('user', ['$rootScope', '$http', function($rootScope, $http){

        var user = false;
        var loggedIn = false;

/*        var setUser = function(data) {
            console.log(this, data);
            this.user = data;
        };*/

        this.getUser = function() { return user; };
        this.isLoggedIn = function() { return loggedIn; };

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
                    user = data;
                    loggedIn = true;
                    $rootScope.$broadcast('userLoggedIn');
                }).
                error(function(data) {
                    error(data);
                });

        };

        this.checkSession = function(success, error){
            $http.get('api/user/checkSession').
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
                    user = false;
                    loggedIn = false;
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
