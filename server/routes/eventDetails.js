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



router.post('/eventData', function(req, res){
  console.log("request to see most recent client received");
  console.log('yes, and mango is ', req.body.eventId);
  getVal = [];
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }
    else {
      var getValQuery = ("SELECT events.id, event_name, address_one, event_state_province, company, begin_date, end_date, notes_events, results_url, schedule_url, hotel_name, hotel_url, event_city, event_url FROM events JOIN hotels ON events.hotel_id = hotels.id WHERE events.id =" + req.body.eventId);
      console.log("we are sending over the query");
      console.log(getValQuery);
      var query = client.query(getValQuery);
      query.on('row', function(row){
        getVal.push(row);
      });
      query.on('end', function(){
        done();
        pg.end();

        console.log('and the event we are receiving will be: ');
        console.log(getVal[0]);
        return res.json(getVal);
        });
      }
    });
});


module.exports = router;
