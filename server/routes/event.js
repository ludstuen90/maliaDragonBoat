var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/groupDB';

router.post('/createEvent', function (req, res){
  var events = req.body;
  pg.connect(connectionString, function(err, client, done){
    console.log('in pg connect', events);
    client.query("INSERT INTO events ( event_name, address_one, address_two, event_city, event_state_province, event_url, company, results_url, schedule_url, begin_date, end_date, notes_events) values ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )",
    [events.event_name, events.address_one, events.address_two, events.event_city, events.event_state_province, events.event_url, events.company, events.results_url, events.schedule_url, events.begin_date, events.end_date, events.notes_events]);
    res.send(true);
    done();
  });
});

router.get('/eventRequest', function (req, res){
  console.log('in eventRequest');
  var eventDisplay = [];
  pg.connect(connectionString, function(err, client, done){
    var queriedEvent = client.query("SELECT * FROM events ORDER BY id DESC;");
    queriedEvent.on('row', function(row){
      eventDisplay.push(row);
    });
    queriedEvent.on('end', function(){
      return res.json(eventDisplay);
    });
    done();
    });
  });

  router.get( '/eventWhotel', function( req, res ) {
    console.log( 'In /eventWhotel.' );
    var eventDisplay = [];
    pg.connect( connectionString, function( err, client, done ) {
      var queriedEvent = client.query( "SELECT events.id, event_name, address_one, address_two, event_state_province, company, begin_date, end_date, notes_events, results_url, schedule_url, hotel_name, event_city, event_url FROM events JOIN hotels ON events.hotel_id = hotels.id;" );
      queriedEvent.on( 'row', function( row ) {
        eventDisplay.push( row );
        console.log( '/eventWhotel returned with ' + eventDisplay + ' which contains ' + eventDisplay.event_name + '.' );
      });
      if( err ) {
        console.log( 'Unable to retrieve event data.' );
      } else {
      queriedEvent.on( 'end', function() {
        return res.json( eventDisplay );
      });
      done();
    }
    });
  });

module.exports = router;
