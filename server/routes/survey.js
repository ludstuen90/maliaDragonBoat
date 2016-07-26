var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/groupDB';

router.post('/responseNo', function (req, res){
  console.log("ID of current user is:", req.user.id);

  var survey = req.body;

  console.log(survey);
  pg.connect(connectionString, function(err, client, done){

    client.query("INSERT INTO survey ( attend_status, user_id ) values ( $1, $2 )",
    [survey.attend_status, req.user.id]);
    res.send(true);
    done();
  });
});

module.exports = router;
