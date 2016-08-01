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

// ROOM BUILDER --------------------------------------------------------------------
var selectedRoom=[];


router.post('/addRoom', function(req, res){
  var room = req.body;
  pg.connect(connectionString, function(err, client, done){
    console.log('In addRoom', room);
    client.query("INSERT INTO rooms ( events_id, room_type, capacity, price, check_in, check_out, notes) values ($1, $2, $3, $4, $5, $6, $7)",
    [ room.events_id, room.room_type, room.capacity, room.price, room.check_in, room.check_out, room.notes]);
    res.send(true);
    done();
  });
});


router.post('/getRoom', function(req, res) { // pulling selected room info from database to display on room picker
    console.log("in router.post  /getroom");
    console.log(req.body);
    selectedRoom = [];  // resets array to empty for new room
    pg.connect(connectionString, function(err, client, done) {  // connecting
      if (err) {     // check for errors
      console.log(err);
    } else { // start selection criteria
         roomInfo=client.query("SELECT * FROM rooms WHERE events_id= '" + req.body.events_id + "'");
         console.log("in /getRoom app: ");
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
      'check_in = $6, ' +
      'check_out = $7 ' +
      'WHERE id = $8',
       [room.room_type, room.capacity, room.room_number, room.notes, room.price, room.check_in, room.check_out, id],
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

router.delete( '/deleteRoom', function( req, res ){   //DELETE ROOMS
  pg.connect( connectionString, function( err, client, done ) {
    console.log( '/deleteRoom route hit.' );
    if( err ){
      console.log( 'Failed to delete room from database.' );
    } else {
      client.query( "DELETE FROM rooms WHERE id = $1;", [ req.body.id ] );
    }
  });
  res.sendStatus(200);
});

// CREATES ROOM OCCUPANT SLOTS IN OCCUPANT_ROOMS TABLE, CALLED IN ADMINSURVEY TAB 4

// var slotsArray = [];

router.post('/createSlots', function(req, res){
  var slots = req.body;
  console.log('In createSlot', slots);
  pg.connect(connectionString, function(err, client, done){
    for (var i=0; i<slots.length; i++) {   // loops thru slotArray
        for (var j=0; j<slots[i].capacity; j++) {
          client.query("INSERT INTO occupant_room ( rooms_id ) VALUES ($1)",
            [ slots[i].id ]);
        } //end loop thru capacity
    } // end loop thru slotArray
    res.send(true);
    done();
  });
});






//ROOM ASSIGNMENT ROUTES:
router.post('/getRoom2', function(req, res) { // pulling selected room info from database to display on room assignment page
    console.log("in rooms.js getroom2");
    console.log(req.body);
    selectedRoom = [];  // resets array to empty for new room
    pg.connect(connectionString, function(err, client, done) {  // connecting
      if (err) {     // check for errors
      console.log(err);
    } else { // start selection criteria
        console.log("successful connection in /getroom2");
         roomInfo=client.query("SELECT * FROM rooms WHERE events_id= '" + req.body.events_id + "'");
         console.log("in /getRoom2 app: ", roomInfo);
          rows = 0;
          roomInfo.on('row', function(row) {  // pushing to array
            selectedRoom.push(row);
          });  // end query push
          roomInfo.on('end', function() {  // sending to client
            console.log("room info from app.post in app", selectedRoom);
            return res.json(selectedRoom);
          }); // end products.on function
          done(); // signals done
      } // end else (for success)
    }); // end pg connect function
}); // end /getRoom2 function

router.get( '/showRoom2', function( req, res ){  // makes returned room info available to room assignment page
      console.log("in showRoom2 function in app: ", selectedRoom);
      return res.json(selectedRoom);
  }); // end  /showRoom2 function

module.exports = router;
