var path = require('path');
var express = require('express');
var router = express.Router();

var pg = require('pg');
var bodyParser = require('body-parser');
var app = express();

//passport connection
var passport = require('./strategies/user.js');
var session = require('express-session');

//Route inclusion
var login = require('./routes/login');
var register = require('./routes/register');
var router = require('./routes/router');
var createEvent = require('./routes/event');
var responseNo = require('./routes/survey');
var surveyResults = require( './routes/survey' );
var lastEvent = require('./routes/lastEvent');
var eventDetails = require('./routes/eventDetails');

app.use(bodyParser.json());

// Setting static page
app.use(express.static( 'public' ));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', createEvent);
app.use('/register', register);
app.use('/router', router);
app.use('/login', login);
app.use('/', login);
app.use('/', router);
app.use('/', responseNo);
app.use( '/', surveyResults );
app.use('/', lastEvent);
app.use('/', eventDetails);


// base url
router.get( '/', function ( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ) );
});

// Spinning up the server
app.listen(3000, function(){
  console.log('listening on server 3000');
});
