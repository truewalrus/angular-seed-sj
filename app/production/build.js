/*! angular-seed-master 2013-04-23 */
"use strict";function MyCtrl1(){}function MyCtrl2(e){e.multiCheck=[{text:"Is Brandon cool?",value:!1},{text:"Is Jon cool?",value:!1},{text:"Is this true?",value:!0}],console.log(e.multiCheck[1].value),e.testModel="test",e.userType="guest"}angular.module("myApp.directives",[]).directive("appVersion",["version",function(e){return function(t,r){r.text(e)}}]),angular.module("myApp.directives",[]).directive("jbFormInput",function(){var e=function(e){var t=["jbFormInput","class","type","ngRepeat","ngModel","jbRequired"];for(var r in t)if(e==t[r])return!0;return!1};return{priority:500,restrict:"E",require:"?ngModel",scope:{ngModel:"=",jbRequired:"=",type:"="},compile:function(t,r){var i=r.type||"text",a="jb-form-input-"+i+(r["class"]?" "+r["class"]:""),l=r.$attr.jbRequired?"required"+(r.jbRequired?'="'+r.jbRequired+'"':""):"",n=' class="'+a+'"',c="<div>";c+=r.label?"<span>"+r.label+"</span>":"";for(var o in r.$attr)e(o)||(n+=" "+r.$attr[o]+(r[o]?'="'+r[o]+'"':""));switch(i){case"text":case"checkbox":n+=l,c+='<input type="'+i+'"'+n+' ng-model="ngModel">';break;case"textarea":n+=l,c+="<textarea"+n+"></textarea>";break;case"multicheckbox":c+='<div ng-repeat="checkbox in ngModel"><input type="checkbox" '+n+' ng-model="checkbox.value">{{checkbox.text}}</div>';break;default:c+=""}return c+="</div>",t.replaceWith(c),function(e,t,r,a){if("multicheckbox"==i){e.checked=0,a.$setValidity("required",!1);for(var l=0;e.ngModel.length>l;l++)e.ngModel[l].value&&e.checked++,e.checked>=e.jbRequired&&a.$setValidity("required",!0),e.$watch("ngModel["+l+"].value",function(t,r){r!=t&&(t?e.checked++:e.checked--,e.checked>=e.jbRequired?a.$setValidity("required",!0):a.$setValidity("required",!1))})}}}}}),MyCtrl1.$inject=["$scope"],MyCtrl2.$inject=["$scope"];var app=angular.module("myApp",["myApp.filters","myApp.services","myApp.directives","ui","ui.bootstrap"]);app.config(["$routeProvider",function(e){e.when("/view1",{templateUrl:"partials/partial1.html"}),e.when("/view2",{templateUrl:"partials/partial2.html",controller:"MyCtrl2"}),e.otherwise({redirectTo:"/view1"})}]),angular.module("myApp.filters",[]).filter("interpolate",["version",function(e){return function(t){return(t+"").replace(/\%VERSION\%/gm,e)}}]),angular.module("myApp.services",[]).value("version","0.1");