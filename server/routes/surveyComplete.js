var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/groupDB';

router.post('/surveyComplete', function(req, res){
console.log(req.body.username, req.body.eventId);
res.sendStatus(200);
});



module.exports = router;
