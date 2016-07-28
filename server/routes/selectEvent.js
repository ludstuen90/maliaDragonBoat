var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/groupDB';


router.get('/selectEvent', function(req, res){

console.log(req.query.id);




});


module.exports = router;
