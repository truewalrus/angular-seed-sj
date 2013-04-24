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

### Front-end
All frontend code is located in app/  

app/js hosts all js files. To add new files, simply create a new file within any of the respective folders and it will be automatically compiled.  
 
For example, to add a new directive:  

  * Open app/js/directives
  * Create a new .js file titled as the name of your directive ([directiveName].js)
  * In your directive, write `angular.module("myApp.directives").directive("[directiveName]" function() { [directive functionality] });`
  * Add all third party minified dependency js files to app/lib/third-party-js and all third party less files
 to app/less/third-party
  * Run `grunt` in command prompt and it's done! Use as normal.  



		angular.module("myApp.directives").directive("directiveName")

* To add 3rd party javascript, drag minified (.min.js) files into app/lib/third-party-js and less files into app/less/third-party.

* Adding a new partial still requires a new $routeProvider route in app.js, less files go in base.less
