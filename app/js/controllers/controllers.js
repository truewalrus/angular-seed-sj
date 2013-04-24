'use strict';

/* Controllers */


angular.module('myApp').controller('MyCtrl1', ['$scope', 'Facebook', function($scope, Facebook) {
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
	/*$scope.login = 	Facebook.login;
	$scope.logout = function(){
		Facebook.logout();
	}
	*/
	console.log("am I crashing right here?");
	$scope.Facebook = Facebook;
	console.log("or afterwards");


}]);


angular.module('myApp').controller('MyCtrl2', ['$scope', function($scope) {
    $scope.multiCheck = [
        {text: "Is Brandon cool?", value: false},
        {text: "Is Jon cool?", value: false},
        {text: "Is this true?", value: true}
    ];
    console.log($scope.multiCheck[1].value);
    $scope.testModel =  "test";

    $scope.userType = 'guest';
}]);
