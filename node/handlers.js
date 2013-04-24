/*
	Handlers
	
	This file defines the functions that are called in the routing section of the index.js node file.
	This file is included by index.js.
	Any logic to interact with databases should be defined in the functions in this file (or modules called by this file)
	in order to handle calls that require database access.
	
	Contents:
	1. Get Request Handlers
		1.1 Main Index / Default Handler
		1.2 'api/bye' Handler
	2. Post Request Handlers
*/

/*
	1. Get Requests
*/

// 1.1 Main Index / Default Handler
function index(request, response) {
	console.log('sending index.html');
	response.sendfile('app/index.html');
}
exports.index = index;

// 1.2 'api/test1' Handler
function test1(request, response) {
	console.log('sending test1');
	response.send('test1');
}
exports.test1 = test1;


/*
	2. Post Requests
*/