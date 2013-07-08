/*
	Handlers
	
	This file defines the functions that are called in the routing section of the index.js node file.
	This file is included by index.js.
	This file initialize the db connection, and if necessary collections do not exist, it populates them with initial values.
	Any logic to interact with databases should be defined in the functions in this file (or modules called by this file)
	in order to handle calls that require database access.
	
	Contents:
	// 1. MongoDB Setup and Initialization
		// 1.1 Initiate MongoDB variables and requirements
		// 1.2 Open connection to db
		// 1.3 populateDB function
	// 2. Get Requests
		// 2.1 Main Index / Default Handler
		// 2.2 'api/bye' Handler
	// 3. Post Request Handlers
*/



// 1. MongoDB Setup and Initialization

// 1.1 Initiate MongoDB variables and requirements
/*
	Include mongodb dependency for node, start new mongodb server, create connector object to the db
*/
var mongodb = require('mongodb'),
	mongoserver = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT, {'auto-reconnect': true}),
    ObjectID = require('mongodb').ObjectID,
	db_connector = new mongodb.Db('test1', mongoserver, {'safe': false, 'strict': true});

var bcrypt = require('bcrypt-nodejs');

// 1.2 Open connection to db
/*
	Open connection to the db, test if users collection exists, if it doesn't, run populateDB() to create and populate the collection
*/
db_connector.open(function(err, db) {
	if (!err) {
		console.log("Connected to test 1!");
		db.collection('users', {strict: true}, function(err, collection) {
			if (err) {
				console.log("The users collection doesn't exist.  Creating it now.");
				populateDB();
			}

            db.ensureIndex('users', {'id': 1}, {unique: true, dropDups: true}, function() {});
		});
	}
});

// 1.3 populateDB function
/*
	Create a list of users
	Create a collection in the db
	Insert the list into the collection
*/
var populateDB = function() {
	var users = [
		{
			fname: "Steven",
			lname: "Cipriano",
            password: "testpw",
			age: 24
		},
		{
			fname: "Jon",
			lname: "Levy",
            password: "bettertest",
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

function clearDatabase(request, response) {
	db_connector.collection('users', function(err, users) {
		console.log("removing");
		users.remove();
		response.send(200);
	});
}
exports.clearDatabase = clearDatabase;

function index(request, response) {
    console.log('Sending index.html (%s)', request.url);
    response.sendfile('app/index.html');
}
exports.index = index;

