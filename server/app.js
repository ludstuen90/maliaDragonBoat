var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

//static folder
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));

//will need to declare database below
var pg = require('pg');
var connectionString = '**';

//base url
app.get( '/', function (req, res){
  res.sendFile( path.resolve('views/index.html') );
});

//spin up server
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Server is up and listening on', app.get('port'));
});
