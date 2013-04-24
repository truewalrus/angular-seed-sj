/*
Form Input Module

Possible types: "text", "checkbox", "textarea", "multicheckbox"
jb-required is a flag that sets whether the form input is required within a form

Sample Usage: Needs to be inside encapsulating <div> tags or scope does not pass down on replace
//No type defaults to "text"
<jb-form-input ng-model = "[modelName]"><jb-form-input>

Sample Form Usage:
<form>
	<jb-form-input ng-model = "[modelName]" jb-required></jb-form-input> 
	
	//For multicheckbox, number of checkboxes required needs to be specified if used within a form
	//jb-required = "2" means that 2 checkboxes need to be checked in order for the form to be valid
	<jb-form-input type = 'multicheckbox' ng-model = "multiCheck" jb-required="2"></jb-form-input>
</form>

//controller for multicheck
	multiCheck = [
        {text: "Box 1", value: false},
        {text: "Box 2", value: false},
        {text: "Box 3", value: true}
    ];
*/
'use strict';
angular.module('myApp.directives')
.directive('jbFormInput', function() {

    /**
     * A helper function for the compile method to check if a specific attribute is supposed to be ignored when copying a tag's attributes over to the replacement HTML tag.
     *
     * @method isIgnoredAttr
     * @param {String} atr The attribute to be checked
     * @return {Boolean} Returns true if the element should be ignored
     */
    var isIgnoredAttr = function(atr) {
        var ignoredAttrs = ["jbFormInput", "class", "type", "ngRepeat", "ngModel", "jbRequired"];

        for (var igAttr in ignoredAttrs) {
            if (atr == ignoredAttrs[igAttr]) return true;
        }

        return false;
    };

	return {
        priority: 500,
		restrict: 'E',
        require: '?ngModel',
        scope: {
            ngModel: '=',
            jbRequired: '=',
            type: '='
        },
		compile: function(element, attrs) {
            var type = attrs.type || "text";
            var classes = "jb-form-input-" + type + (attrs['class'] ? " " + attrs['class'] : "");
            var requiredHtml = attrs.$attr['jbRequired'] ? "required" + (attrs['jbRequired'] ? "=\"" + attrs['jbRequired'] + "\"" : "") : "";
            var attrHtml = (" class=\"" + classes + "\"");

            var htmlText = "<div>";

            htmlText += attrs.label ? "<span>" + attrs.label + "</span>" : "";

            // Copy all attributes over to the new HTML tag.
            for (var atr in attrs.$attr) {
                // If the attribute is not an ignored attribute, copy it over to the new tag.
                // Appends " (ATTRIBUTE NAME)" and, if not a standalone attribute, "=(ATTRIBUTE VALUE)".
                if (!isIgnoredAttr(atr)) attrHtml += " " + attrs.$attr[atr] + (attrs[atr] ? "=\"" + attrs[atr] + "\"" : "");
            }

            // Create the replacement tag HTML based on the type attribute that was passed in.
            switch (type) {
                case "text":
                case "checkbox":
                    attrHtml += requiredHtml;
                    htmlText += "<input type=\"" + type + "\"" + attrHtml + " ng-model=\"ngModel\">";
                    break;
                case "textarea":
                    attrHtml += requiredHtml;
                    htmlText += "<textarea" + attrHtml + "></textarea>";
                    break;
                case "multicheckbox":
                    htmlText += "<div ng-repeat=\"checkbox in ngModel\"><input type=\"checkbox\" " + attrHtml + " ng-model=\"checkbox.value\">{{checkbox.text}}</div>";
                    break;
                default:
                    htmlText += "";
                    break;
            }

            htmlText += "</div>";

            element.replaceWith(htmlText);

            return function(scope, elem, attr, ctrl) {
                if (type == "multicheckbox") {
                    scope.checked = 0;

                    ctrl.$setValidity('required',false);
					
					var checkVal = function(value, oldValue) {
						if (oldValue != value) {
							if (value) {
								scope.checked++;
							}
							else {
								scope.checked--;
							}

							if (scope.checked >= scope.jbRequired) {
								ctrl.$setValidity('required',true);
							}
							else {
								ctrl.$setValidity('required',false);
							}
						}
					};

                    for (var i = 0; i < scope.ngModel.length; i++) {
                        if (scope.ngModel[i].value) {
                            scope.checked++;
                        }

                        if (scope.checked >= scope.jbRequired) {
                            ctrl.$setValidity('required',true);
                        }

                        scope.$watch('ngModel[' + i + '].value', checkVal);
                    }
                }
            };
		}
	};
});

/*Facebook factory methods can be called globally after Facebook is attached to rootScope*/
/*
angular.module('jbFormInputModule', [])
.factory('Facebook', function($rootScope, $q, $timeout) {
	return {
		login: function() {
			//asynchronous promise
			var resp = $q.defer();
			FB.login(function(response) {
				//wait for a response from facebook
				$timeout(function(){resp.resolve(response.authResponse)}, 1);
				
			});
			//Set the access token to global value Facebook.token
			$rootScope.Facebook.token = resp.promise;
			//global token 
		},
		
		logout: function() {
			var resp = $q.defer();
			FB.logout(function(response) {
				//wait for a response from facebook
				$timeout(function(){resp.resolve(response.authResponse)}, 1);
			});

			$rootScope.Facebook.token = null;   
		}
    }
});



/*
angular.module('jbFormInputModule', [])
.service('Facebook', function($rootScope, $q, $timeout){
	this.login = function(){
			var resp = $q.defer();
			FB.login(function(response) {
				$timeout(function(){resp.resolve(response.authResponse)}, 1);
			});
			$rootScope.Facebook.token = resp.promise;
	};
	
	this.logout = function(){
			var resp = $q.defer();
			FB.logout(function(response) {
				$timeout(function(){resp.resolve(response.authResponse)}, 1);
			});

			$rootScope.Facebook.token = null;   
		}
	

});
*/
/*
//Facebook initialization functions
//appId is obtained through a developer account at Facebook, will change based on name of app
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
*/
 
