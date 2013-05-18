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


function MyCtrl2($scope, user) {

    $scope.multiCheck = [
        {text: "Is Brandon cool?", value: false},
        {text: "Is Jon cool?", value: false},
        {text: "Is this true?", value: true}
    ];
    console.log($scope.multiCheck[1].value);
    $scope.testModel =  "test";

    $scope.userType = 'guest';
	
	$scope.login = function() {
        user.login('Jon', {},
        function(data){
            console.log(data);
        },
        function(){
            console.log("error2");
        });
    };


    $scope.signUp = function(){
        user.signUp('rekursiv', 'hunter2',
            function(data){
                console.log(data);
            },
            function(data){
                console.log(data);
            });
    };


    $scope.checkSession = function(){
        user.checkSession('Jon', {},
            function(data){
                console.log(data);
            },
            function(data){
                console.log(data);
            });
    };

	$scope.timepicker = {
		"time": ""
	};
}
MyCtrl2.$inject = ['$scope', 'user'];
