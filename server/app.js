var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

global.userName = '';

// ################################# BELOW ADDED FOR LOG IN
var passport = require('../strategies/user_sql.js');
var session = require('express-session');

// Route includes
var index = require('../routes/index');
var user = require('../routes/user');
var register = require('../routes/register');

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
// ################################# ABOVE ADDED FOR LOGIN




//static folder
app.use(express.static('public'));

//will need to declare databse below
var pg = require('pg');
var connectionString = '**';

//base url
app.get( '/', function (req, res){
  res.sendFile( path.resolve( 'views/login.html') );
});

app.get( '/index', function (req, res){
  res.sendFile( path.resolve( 'views/index.html') );
});

//spin up server
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Server is up and listening on', app.get('port'));
});

app.post('/register1', function(req, res){
  console.log(req.body.username);
  console.log(req.body.password);
  res.sendStatus(200);
});


//// BELOW ADDED FOR LOGIN

// Routes
app.use('/register', register);
app.use('/user', user);
app.use('/*', index);


function isAuthenticated(req, res, next) {

    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user == null){
        res.redirect('/');
    }

    if (req.user.username !== undefined)
        return next();
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/');
}
