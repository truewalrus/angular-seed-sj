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
var bcrypt = require('bcrypt-nodejs');
var handlers = require('./node/handlers');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var http = require('http');
//var https = require('https');

passport.serializeUser(function(user, done) {
   done(null, user._id);
});

passport.deserializeUser(function(id, done) {
   handlers.findById(id, function(err, user) {
        done(err, user);
   });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("Auth: ", username, password);
        handlers.findByUsername(username, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { errUser: true }); }
            if (!bcrypt.compareSync(password, user.password)) { return done(null, false, { errPassword: true }); }

            return done(null, user);
        });
    }
))

var privateKey = fs.readFileSync('key/ssl.key').toString();
var certificate = fs.readFileSync('key/ssl.crt').toString();

/*
	3. Start App With Express
*/
var app = express();


/* 
	4. Configuration
*/
app.use(express.static(__dirname + '/app'));

app.use(express.cookieParser());
app.use(express.session({ secret: "keyboard cat" }));
app.use(passport.initialize());
app.use(passport.session());

// 4.1 Set Static File Path

app.use(express.bodyParser());



/*
	5. Routing for API calls
*/

// 5.1 test1 get call
/*
	Returns the string 'sending test1'
*/
app.get('/favicon.ico', function(request, response) {
	response.send(404);
});

app.get('/api/test1', handlers.test1);

// 5.2 user get call
/*
	returns all users in a list of objects
*/
//app.get('/api/user', handlers.allUsers);
app.get('/api/user', ensureAuthentication, handlers.userInfo);

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

// 5.5 user logout call
/*
	
*/
app.get('/api/user/logout', handlers.userLogout);

// 5.6 delete user
app.get('/api/user/delete', handlers.userDelete);

app.get('/api/user/clear', handlers.clearDatabase);

app.post('/api/user/login', function(request, response, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                return response.send(401, info);
            }

            request.login(user, function(err) {
                if (err) { return next(err); }
                console.log("User logged in");
                return response.send(200, { 'username': user.username });
            });
        })(request, response, next);
});

app.get('/api/user/checkSession', ensureAuthentication, handlers.checkSession);

// 5.55 catch-all get call 
/*
	any get calls that do not match an above api call will direct to the angularjs app to handle front-end routing
*/
app.get('*', handlers.index);

//app.post('/api/user/login', handlers.userLogin);
app.post('/api/user/create', handlers.createUser);

/*var app2 = express();

app2.get('*', function(request, response) {
	response.redirect('https://' + resquest.header('Host') + request.url);
});

var reServer = http.createServer(app2);
reServer.listen(port + 1);
*/


/*
	6. Listen On Specified Port
*/
//var server = https.createServer({key: privateKey, cert: certificate}, app);
app.listen(port);
console.log('Listening on port %d.', port);

function ensureAuthentication(request, response, next) {
    if (!request.user) { return response.send(401); }

    return next();
}