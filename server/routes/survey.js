var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/groupDB';

router.get( '/surveyResults', function( req, res ) {
  var surveyDisplay = [];
  pg.connect( connectionString, function( err, client, done ) {
    var queriedResults = client.query( 'SELECT attend_status, hotel_status, notes_other_accommodation, just_me, me_and_non_paddlers, num_non_paddlers, me_and_one_paddler, me_and_paddlers, notes_survey_room, room_preference, first_name, last_name, event_name FROM survey JOIN users ON survey.user_id = users.id JOIN events ON survey.events_id = events.id;' );
  });
});

// WORDS NOT MEANT FOR MASTER //


module.exports = router;
