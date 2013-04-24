# angular-seed-sj

This is an easily modifiable angular-seed incorporating angular-ui, bootstrap, and currently jQuery.

## Server Setup

After pulling, navigate to the main folder and open cmd prompt, enter and run:
* npm install -- this installs all needed dependencies
* grunt -- compiles all code into its production form, which is currently what the index file is looking at to run
* node server -- server.js is the file in which the node server is located, node server runs this server

In order to view the web page, go to localhost:1337 in a browser

## Directory Structure
This seed is setup to easily incorporate new files without having to often modify app.js or index.html.

### Front-end
All frontend code is located in app/

-- app/js hosts all js files. To add new files, simply create a new file within any of the respective folders and it will be automatically compiled

	-- If adding a new directive, service, or filter, the angular-module should be done like so for a directive, replace "directives" with "filters" and "services" respectively:
		```html
		<angular.module('myApp.directives").directive('directiveName')
		```
		and use it as normal.

To add 3rd party javascirpt, drag min files into lib/third-party-js and less files into less/third-party.

Adding a new partial still requires a new $routeProvider route in app.js, less files go in base.less