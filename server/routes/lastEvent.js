var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/groupDB';


if(process.env.DATABASE_URL !== undefined) {
     console.log('env connection string');
     connectionString = process.env.DATABASE_URL;
     pg.defaults.ssl = true;
 } else {
     connectionString = 'postgres://localhost:5432/groupDB';
 }
 // console.log("connectionString set to: ", connectionString);





router.get('/lastEvent', function(req, res){
  console.log("request to get most recent client received");
  getVal = [];
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }
    else {
      var getValQuery = ('select id from events ORDER BY id DESC limit 1');
      console.log("we are sending over the query");
      console.log(getValQuery);
      var query = client.query(getValQuery);
      query.on('row', function(row){
        getVal.push(row);
      });
      query.on('end', function(){
        done();
        pg.end();

        console.log('and the results for case meta information will be...');
        console.log(getVal[0].id);
        global.caseId = getVal[0].id;
        return res.json(getVal);
        });
      }
    });
});

module.exports = router;
