var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/groupDB';



router.get('/hello', function(req, res){
    res.send(req.user.username);
  });



module.exports = router;
