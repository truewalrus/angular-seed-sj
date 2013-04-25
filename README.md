# angular-seed-sj

This is an easily modifiable angular-seed incorporating angular-ui, bootstrap, and currently jQuery.

## Server Setup

After pulling, navigate to the main folder and open cmd prompt, enter and run:
* `npm install` -- this installs all needed dependencies
* `grunt` -- compiles all code into its production form, which is currently what the index file is looking at to run
* `node server` -- server.js is the file in which the node server is located, node server runs this server

In order to view the web page, go to localhost:1337 in a browser

## Directory Structure
This seed is setup to easily incorporate new files without having to often modify app.js or index.html.

### Front-end JONLLLLLLLLLLLLLLLLLLLLLLLLLLLL
All frontend code is located in app/  

app/js hosts all js files. To add new files, simply create a new file within any of the respective folders and it will be automatically compiled.  
 
####For example, to add a new directive:  

* Open `app/js/directives`
* Create a new .js file titled as the name of your directive ([directiveName].js)
* In your directive, write   

		angular.module("myApp.directives").directive("[directiveName]" function() { [directive functionality] });

* Add all third party minified dependency js files to `app/lib/third-party-js` and all third party less files to `app/less/third-party`
* Run `grunt` in command prompt and it's done! Use as normal.  

####To add a new partial:
* Create a new html file in `app/partials`
* Open `app/js/app.js`
* Add routing to your new partial
		
		$routeProvider.when('/[partialName]', {templateUrl: 'partials/[partialName].html'});

* Navigate to `app/js/controllers.js` and create a new .js file
* In the js file, create a new controller
		
		function [controllerName] ($scope){}
		[controllerName].$inject = ['$scope'];

* In the partial, set up ng-controller to use the controller you just created
		
		<div ng-controller = '[controllerName]'> 
			//html code
		</div>

* Run `node server` in a command prompt
* Navigate to the site `localhost:1337/[partialName] to see it

### Back-end
The site is hosted using Node.JS

#### Initial Installation and Setup
*This assumes that the user has Node.JS already installed.  If they don't, see the [Node Docs](http://nodejs.org/) for installation instructions*  

* The first time initializing the app, the user must run `npm install` to install all dependencies
* The package.json file in the root folder contains necessary dependencies for Node, as well as Grunt (the task-runner for building the app).  It also specifies the version of each dependency to install.  
	* Node dependencies:
		* [express](http://expressjs.com/) (node.js web framework)
		* [mongodb](http://www.mongodb.org/) (MongoDB database)
	* Grunt dependencies:
		* [grunt](http://gruntjs.com/) (task-runner for javascript)
		* [jshint](https://github.com/gruntjs/grunt-contrib-jshint) (checks all js files for errors, and will halt grunt if errors are found)
		* [uglify](https://github.com/gruntjs/grunt-contrib-uglify) (minifies files)
		* [less](https://github.com/gruntjs/grunt-contrib-less) (converts all .less files to one .css files)
		* [karma](https://github.com/karma-runner/grunt-karma) (runs unit and e2e tests)
		* [concat](https://github.com/gruntjs/grunt-contrib-concat) (concatenates files)
* Any time a new module or dependency is added, `npm install` must be run again to install that new piece

#### Running the Server

* To start the server, open a command terminal, navigate to the root directory, and type `node server`
* The terminal should then say `Listening on port 1337`

#### Adding Routes for Backend API Calls

* There are 2 main steps for adding a new route for a backend api call:  
	1. Add a line in the server.js file to route the specific call
		ex: `app.get('/api/ex1', handlers.test1);`
	2. Add handler logic in node/handlers.js file to generate the appropriate response  

			/* 
			   create function to handle request 
			   express feeds all request handlers a request and response object
			*/
			function test1(request, response) {
				// sent the text 'test1' as the response
				response.send('test1');
			}
			// include test1 as part of the exports so it's accessible in the server.js file
			exports.test1 = test1;
		
		Request handling can obviously become more complex when querying databases and such, but the routing principles remain the same.


#### Adding custom modules
