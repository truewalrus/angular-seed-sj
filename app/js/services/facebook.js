/*Service for getting facebook login*/

'use strict';
angular.module('myApp.services')
.service('Facebook', function($q, $timeout){

	//setting a variable for response from facebook
	this.fbResponse	= '';
	
	/**
	* Service method for logging into facebook. Facebook.login();
	*
	* @method login
	*/
	this.login = function(){
        //$q.defer sets up an asynchronous promise
		var resp = $q.defer();

        //FB.login is Facebook's api login method, returns various information which is stored in resp
		FB.login(function(response) {

            //function to resolve asynchronous response now that information has time to be obtained through $timeout
			var resolved = function(){
				resp.resolve(response.authResponse);
			};
			$timeout(resolved, 1);
		});

        //set the variable for the response
		this.fbResponse = resp.promise;
	};
	
	this.logout = function(){
		var resp = $q.defer();
		FB.logout(function(response) {
		
			var resolved = function(){
				resp.resolve(response.authResponse);
			};
			$timeout(resolved, 1);
		});

		this.fbResponse = null;   
	};
});

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