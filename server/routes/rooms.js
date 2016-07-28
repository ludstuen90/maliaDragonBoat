var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/groupDB';


// ROOM BUILDER --------------------------------------------------------------------
var selectedRoom=[];

router.post('/getRoom', function(req, res) { // pulling selected room info from database to display on room picker
    console.log("in app.post  getroom");
    console.log(req.body);
    selectedRoom = [];  // resets array to empty for new room
    pg.connect(connectionString, function(err, client, done) {  // connecting to disinfectants database
      if (err) {     // check for errors
      console.log(err);
    } else { // start selection criteria
        //  roomInfo=client.query("SELECT * FROM roominfo WHERE room_number= ' + req.body.room_number ' ");
         roomInfo=client.query("SELECT * FROM rooms WHERE room_number= '" + req.body.room_number +"'");
         console.log("roominfoin app: ");
          rows = 0;
          roomInfo.on('row', function(row) {  // pushing to array
            selectedRoom.push(row);
          });  // end query push
          roomInfo.on('end', function() {  // sending to scripts
            console.log("room info from app.post in app", selectedRoom);
            return res.json(selectedRoom);
          }); // end products.on function
          done(); // signals done
      } // end else (for success)
    }); // end pg connect function
}); // end /getRoomfunction

router.get( '/showRoom', function( req, res ){  // makes returned room info available to room assigner
      console.log("in showRoom function in app: ", selectedRoom);
      return res.json(selectedRoom);
  }); // end  /showRoom function

router.post('/saveRoom/:id', function(req, res) {
  var room = req.body;
  var id = req.params.id;
  pg.connect(connectionString, function(err, client, done) {
    if (err){  //connection error
      console.log('error at pg connect.');
      res.sendStatus(500);
    } // end connection error
    console.log("in client.query update");
    client.query('UPDATE rooms ' +
      'SET room_type = $1, ' +
      'capacity = $2, ' +
      'room_number = $3, ' +
      'notes = $4, ' +
      'price = $5, ' +
      'check_in_date = $6, ' +
      'check_out_date = $7 ' +
      'WHERE id = $8',
       [room.room_type, room.capacity, room.room_number, room.notes, room.price, room.check_in_date, room.check_out_date, id],  // updating room info changes
    function(err, result){
      done();
      if (err) {
        console.log("error in app.js:");
         console.log(err);
          res.sendStatus(500);
          return;
      }
      res.sendStatus(204);  // success
    });
  }); //end connection
}); //end /saveroom function






module.exports = router;