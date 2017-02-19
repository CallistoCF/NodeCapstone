//server.js

//setup

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var socket_io = require('socket.io');
var http = require('http');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

//configuration

mongoose.connect(configDB.url);

require('./config/passport')(passport);
// pass passport for configuration

var server = http.Server(app);

server.listen(process.env.PORT || 8080);

// set up our express application
app.use(express.static('public'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static('public'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(__dirname + '/views'));
// app.use(express.static('views'));
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);

var getIP = require('ipware')().get_ip;
app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    console.log(ipInfo);
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
});

console.log('The magic happens on port ' + port);
