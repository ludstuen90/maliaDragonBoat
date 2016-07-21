var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//will need to declare databse below
var pg = require('pg');
var connectionString = '**';

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Server is up and listening on', app.get('port'));
});


app.get('/', function(req, res){
  res.sendFile(path.resolve('views/index.html'));
});

app.use(express.static('public'));
