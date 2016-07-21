var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//will need to declare databse below
var pg = require('pg');
var connectionString = '**';

app.listen(3000, function(req, res){
  console.log("Server is up and listening on port 30000");
});

app.get('/', function(req, res){
  res.sendFile(path.resolve('views/index.html'));
});

app.use(express.static('public'));
