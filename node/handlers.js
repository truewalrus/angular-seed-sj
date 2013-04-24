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


var mongodb = require('mongodb'),
	mongoserver = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT, {'auto-reconnect': true}),
	db_connector = new mongodb.Db('test1', mongoserver, {'strict': true});

db_connector.open(function(err, db) {
	if (!err) {
		console.log("Connected to test 1!");
		db.collection('users', {strict: true}, function(err, collection) {
			if (err) {
				console.log("The users collection doesn't exist.  Creating it now.");
				populateDB();
			}
		});
	}
});

var populateDB = function() {
	var users = [
		{
			fname: "Steven",
			lname: "Cipriano",
			age: 24
		},
		{
			fname: "Jon",
			lname: "Levy",
			age: 24
		}
	];
	
	db_connector.createCollection('users', {strict: true}, function(err, collection) {
		if (err) {
			console.log(err);
		} else {
			collection.insert(users, {strict: true}, function(err, result) {});
		}
	});
};

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

// 1.3 'api/user' Handler
function allUsers(request, response) {
	db_connector.collection('users', function(err, collection) {
		collection.find().toArray(function(err, items) {
			response.send(items);
		});
	});
}
exports.allUsers = allUsers;

// 1.4 'api/user/fname/:fname' Handler
function findUserByFname(request, response) {
	
	var fname = request.params.fname;
	
	db_connector.collection('users', function(err, collection) {
		collection.find({'fname': fname}).toArray(function(err, items) {
			response.send(items);
		});
	});
}
exports.findUserByFname = findUserByFname;

// 1.5 'api/user/age/:age' Handler
function findUserByAge(request, response) {
	
	var age = parseInt(request.params.age);
	
	db_connector.collection('users', function(err, collection) {
		collection.find({'age': age}).toArray(function(err, items) {
			response.send(items);
		});
	});
}
exports.findUserByAge = findUserByAge;


/*
	2. Post Requests
*/