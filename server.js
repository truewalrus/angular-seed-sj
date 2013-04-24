/*
	Node Server
	
	This is the main file for running the NodeJS server to host the application.  
	It initiates the app using the Express Framework for Node, sets the static file path for the app,
	handles the routing by calling specific functions included in the node/handlers.js file, and listens
	on a specified port.
	
	Contents:
	1. Set Initial Values
	2. Include Dependencies
	3. Start App With Express
	4. Configuration
		4.1 Set Static File Path
	5. Routing
		// 5.1 test1 get call
		// 5.2 user get call
		// 5.3 user first name get call
		// 5.4 user age call
		// 5.5 catch-all get call
	6. Listen on Specified Port
	
	
	To add a route:
		**Note** All api calls should have 'api/' in front of them to avoid conflicts with the angular routing.
		
		1. Define a new app.get or app.post in section 5.
			ex: app.get('api/myNewRoute', handlers.myNewRoute)
		2. Define a new handler function in the node/handlers.js file
			ex (in node/handlers.js):
			
			function myNewRoute(request, response) {
				response.send('this is my new route!');
			}
			exports.myNewRoute = myNewRoute;
*/


/*
	1. Set Initial Values
*/
var port = 1337;


/*
	2. Include Dependencies
*/
var express = require('express');
var handlers = require('./node/handlers');


/*
	3. Start App With Express
*/
var app = express();


/* 
	4. Configuration
*/

// 4.1 Set Static File Path
app.use(express.static(__dirname + '/app'));


/*
	5. Routing for API calls
*/

// 5.1 test1 get call
/*
	Returns the string 'sending test1'
*/
app.get('/api/test1', handlers.test1);

// 5.2 user get call
/*
	returns all users in a list of objects
*/
app.get('/api/user', handlers.allUsers);

// 5.3 user first name get call 
/*
	returns users matching the first name field provided in a list of objects
*/
app.get('/api/user/fname/:fname', handlers.findUserByFname);

// 5.4 user age call 
/*
	returns users matching the age field provided in a list of objects
*/
app.get('/api/user/age/:age', handlers.findUserByAge);

// 5.5 catch-all get call 
/*
	any get calls that do not match an above api call will direct to the angularjs app to handle front-end routing
*/
app.get('*', handlers.index);


/*
	6. Listen On Specified Port
*/
app.listen(port);
console.log('Listening on port %d.', port);