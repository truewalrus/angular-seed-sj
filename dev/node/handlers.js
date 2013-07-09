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



function users_findById(id, fn) {
    console.log("Finding by ID");
    db_connector.collection('users', function(err, collection) {
        collection.find({'_id': ObjectID(id)}).toArray(function(err, items) {
            if (err) { return fn(err); }

            if (items.length > 0) {
                return fn(null, items[0]);
            }
            else {
                return fn(new Error('User ' + id + ' does not exist'));
            }
        });
    });
}
exports.users_findById = users_findById;

function users_findByUsername(username, fn) {
    console.log("Finding by Username");

    db_connector.collection('users', function(err, collection) {
        collection.find({'username': username}).toArray(function(err, items) {
            if (err) { return fn(err); }

            if (items.length > 0) {
                return fn(null, items[0]);
            }
            else {
                return fn(null, null);
            }
        });
    });
}
exports.users_findByUsername = users_findByUsername;

// 2. Get Requests

// 2.1 Main Index / Default Handler

// 2.3 'api/user' Handler
function users_allUsers(request, response) {
    db_connector.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            response.send(items);
        });
    });
}
exports.users_allUsers = users_allUsers;

// 2.4 'api/user/fname/:fname' Handler
function users_findUserByFname(request, response) {

    var fname = request.params.fname;

    db_connector.collection('users', function(err, collection) {
        collection.find({'fname': fname}).toArray(function(err, items) {
            response.send(items);
        });
    });
}
exports.users_findUserByFname = users_findUserByFname;

// 2.5 'api/user/age/:age' Handler
function users_findUserByAge(request, response) {

    var age = parseInt(request.params.age);

    db_connector.collection('users', function(err, collection) {
        collection.find({'age': age}).toArray(function(err, items) {
            response.send(items);
        });
    });
}
exports.users_findUserByAge = users_findUserByAge;


function users_userLogout(request, response) {
    /*	request.session.destroy(function(err){
     if (err) {
     response.send("Logout failed", 401);
     }
     else {
     response.send("Logout Successful", 200);
     }
     });*/

    request.logout();
    response.send(200);
}
exports.users_userLogout = users_userLogout;

function users_userInfo(request, response) {
    response.send(request.user);
}
exports.users_userInfo = users_userInfo;

function users_userDelete(request, response) {


    db_connector.collection('users', function(err, collection) {
        collection.remove({'id': request.user.id}, function(err) {
            if (err) {
                console.log('error here: ' + err);
                response.send({'message':'Failed to delete user'}, 401);
            }
            else {
                request.logout();
                response.send(200);
            }
        });
    });
}
exports.users_userDelete = users_userDelete;

// 3. Post Requests

/*function userLogin(request, response){

 db_connector.collection('users', function(err, collection) {
 collection.find({'id': request.body.username.toUpperCase(), 'password': request.body.password}).toArray(function(err, items) {


 if(items.length > 0) {
 request.session.username = request.body.username;
 request.session.cookie.maxAge = 1000 * 60 * 60;

 response.send({"message":"Login Successful", "username":items[0].username});
 }

 if(items.length == 0) {
 response.send("Incorrect username and/or password!!!", 401);
 }

 if (err) {
 console.log('error here: ' + err);
 }
 });
 });
 }
 exports.userLogin = userLogin;*/

function users_createUser(request, response){
    var salt = bcrypt.genSaltSync();
    var password =  bcrypt.hashSync(request.body.password, salt);
    db_connector.collection('users', function(err, collection){
        collection.insert({'username': request.body.username, 'password': password, 'id': request.body.username.toUpperCase()}, {safe: true}, function(err, data){
            if (err) {
                response.send("Username already exists!!!", 401);
            }
            else {
                console.log("Data added as " + data[0].id);
                response.send(data[0]);
            }
        });
    });
}
exports.users_createUser = users_createUser;

function users_checkSession(request,response){
    response.send(200);
    /*    if(request.session.username){
     response.send({'message':"Ok", 'username':request.session.username});
     }
     else{
     response.send("Session not found", 401);
     }*/
}
exports.users_checkSession = users_checkSession;
