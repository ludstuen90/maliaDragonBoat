var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/groupDB';

// RESPONSE OTHER ACCOMODATION
router.post('/responseNo', function (req, res){
<<<<<<< HEAD
  console.log("ID of current user is:", req.user.id);
=======
  // console.log("ID of current user is:", req.user.id);
  console.log('we are in a no response!');
  console.log('alternatively, ', req.user.id);
>>>>>>> 82b08a160641cdbfd45fa9715118edebb74a7105

  var survey = req.body;

  // console.log(survey);
  pg.connect(connectionString, function(err, client, done){
    client.query("INSERT INTO survey ( attend_status, user_id, events_id) values ( $1, $2, $3 )",
    [survey.attend_status, req.user.id, survey.events_id]);
    res.send(true);
    done();
  });
});

// RESPONSE OTHER ACCOMODATION
router.post('/otherAccommodation', function (req, res){

  var survey = req.body;

  console.log(survey);
  pg.connect(connectionString, function(err, client, done){
    client.query("INSERT INTO survey ( attend_status, user_id, events_id, hotel_status, notes_other_accommodation ) values ( $1, $2, $3, $4, $5 )",
    [survey.attend_status, req.user.id, survey.events_id,  survey.hotel_status, survey.notes_other_accommodation]);
    res.send(true);
    done();
  });
});

// RESPONSE OTHER ACCOMODATION
router.post('/hotel', function (req, res){
  var survey = req.body;
  pg.connect(connectionString, function(err, client, done){
    client.query("INSERT INTO survey ( attend_status, user_id, events_id,  hotel_status, roommate_option, num_non_paddlers, notes_survey_room ) values ( $1, $2, $3, $4, $5, $6, $7 )",
    [survey.attend_status, req.user.id, survey.events_id, survey.hotel_status, survey.roommate_option, survey.num_non_paddlers, survey.notes_survey_room ]);

    res.send(true);
    done();
  });
});

router.get( '/surveyResults', function( req, res ) {
  var surveyResults = [];
  pg.connect( connectionString, function( err, client, done ) {
    var surveyData = client.query( "SELECT attend_status, hotel_status, notes_other_accommodation, roommate_option, num_non_paddlers, notes_survey_room, room_preference, first_name, last_name, event_name, username, events_id FROM survey JOIN users ON survey.user_id = users.id JOIN events ON survey.events_id = events.id;" );
    surveyData.on( 'row', function( row ) {
      surveyResults.push( row );
      console.log( "/surveyResults returned with: " + surveyResults + ',' + ' which consists of: ' + surveyResults.first_name + ', ' + surveyResults.last_name + '.' );
    });
    // console.log( "/surveyResults returned with: " + surveyResults + '.' );
    if( err ) {
      console.log( 'Unable to retrieve survey data.' );
    } else {
    surveyData.on( 'end', function() {
      return res.json( surveyResults );
    });
    done();
    }
  });
});

module.exports = router;
