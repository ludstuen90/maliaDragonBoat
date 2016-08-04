var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var async = require('async');
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


router.post('/eventPhase', function(req, res){
            console.log("request to see the event phase received. ");
            console.log('yes, and mango is ', req.body.eventId);
            getVal = [];
            pg.connect(connectionString, function(err, client, done){
              if(err){
                console.log(err);
              }
              else {
                var getValQuery = ('select hotel_phase from events where id=' + req.body.eventId);
                console.log("we are sending over the query");
                console.log(getValQuery);
                var query = client.query(getValQuery);
                query.on('row', function(row){
                  getVal.push(row);
                });
                query.on('end', function(){
                  done();
                  pg.end();
                  console.log('and the event phase status we are receiving will be: ');
                  console.log(getVal[0]);
                  return res.json(getVal);
                  });
                }
              });


});






module.exports = router;
