angular.module('myApp.services', [])
.service('Facebook', function($q, $timeout){
	this.fbResponse	= '';
	
	//this.login = function(){
			var resp = $q.defer();
			FB.login(function(response) {
				$timeout(function(){resp.resolve(response.authResponse)}, 1);
			});
			this.fbResponse = resp.promise;
				console.log(this.fbResponse);
	};
	
	this.logout = function(){
			var resp = $q.defer();
			FB.logout(function(response) {
				$timeout(function(){resp.resolve(response.authResponse)}, 1);
			});

			this.fbResponse = null;   
		};
	
	

});

window.fbAsyncInit = function() {
console.log("confirm2");
	FB.init({
		appId: '281909378612016'
	});
};

// Load the Facebook SDK Asynchronously
(function(d){
console.log("confirm");
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));