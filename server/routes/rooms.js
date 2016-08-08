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
// var selectedRoom=[];


router.post('/addRoom', function(req, res){
  var room = req.body;
  pg.connect(connectionString, function(err, client, done){
    if( err ) {
      console.log( "/addRoom failed." );
    } else {
    console.log('In addRoom', room);
    client.query("INSERT INTO rooms ( events_id, room_type, capacity, price, check_in, check_out, notes, hotels_id) values ($1, $2, $3, $4, $5, $6, $7, $8)",
    [room.events_id, room.room_type, room.capacity, room.price, room.check_in, room.check_out, room.notes, room.hotels_id]);
    // client.query("INSERT INTO rooms ( events_id, room_type, capacity, price, check_in, check_out, notes) values ($1, $2, $3, $4, $5, $6, $7)",
    // [ room.events_id, room.room_type, room.capacity, room.price, room.check_in, room.check_out, room.notes]);
    res.send(true);
    done();
  }
  });
});

var selectedRoom = [];

router.post('/getRoom', function(req, res) { // pulling selected room info from database to display on room picker
    console.log("in router.post  /getroom");
    console.log(req.body);
    selectedRoom = [];  // resets array to empty for new room  --> NOT ANYMORE.
    pg.connect(connectionString, function(err, client, done) {  // connecting to disinfectants database
      if (err) {     // check for errors
      console.log(err);
    } else { // start selection criteria
         roomInfo=client.query("SELECT * FROM rooms WHERE events_id= '" + req.body.events_id + "' ORDER BY(id) DESC");
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

router.delete( '/deleteSlots', function( req, res ){   //DELETE Slots so it will then delete the room
  pg.connect( connectionString, function( err, client, done ) {
    console.log( '/deleteSlots route hit.' );
    if( err ){
      console.log( 'Failed to delete slots from database.' );
    } else {
      client.query( "DELETE FROM occupant_room WHERE rooms_id = $1;", [ req.body.id ] );
    }
  });
  res.sendStatus(200);
});


router.delete( '/deleteRoom', function( req, res ){   //DELETE ROOMS
  pg.connect( connectionString, function( err, client, done ) {
    console.log( '/deleteRoom route hit.' );
    if( err ){
      console.log( 'Failed to delete room from database.' );
    } else {
      client.query( "DELETE FROM rooms WHERE id = $1;", [ req.body.id ] );
    }
  });
  pg.end();
  res.sendStatus(200);
});


router.post('/createSlots', function(req, res){
  var slots = req.body;
  console.log('In createSlot', slots);
  pg.connect(connectionString, function(err, client, done){
    for (var i=0; i<slots.length; i++) {   // loops thru slots array to hit each room
        for (var j=0; j<slots[i].capacity; j++) { // loops thru capacity to create a slot for the capacity of each room
          client.query("INSERT INTO occupant_room ( rooms_id, guest_name) VALUES ($1, $2);", [slots[i].id, "empty"] );
          // client.query("INSERT INTO occupant_room ( rooms_id, ) VALUES ($1);",
            // [ slots[i].id ]);
        } //end loop thru capacity
    } // end loop thru slotArray
    res.send(true);
    done();
  });
});

var slotsArray;

router.post('/getSlots', function(req, res){
  console.log("Get client request received!");
  var client = {
    id: req.body.room
  };

  console.log("clent ID is  ", client.id);

    console.log("We are about to search for client ", client.id);
    var search =('SELECT * FROM occupant_room WHERE rooms_id=' + client.id );
    search.toString();
      results = [];
      pg.connect(connectionString, function(err, client, done){
        var query = client.query(search);
        query.on('row', function(row){
          console.log('we are now pushing ', row);
          results.push(row);
        });
        query.on('end', function(){
          done();
          pg.end();
          return res.json(results);
        });
        if(err){
          console.log(err);
        }
        });
});

router.post('/getSlots9000', function(req, res) { // pulling selected room info from database to display on room picker
    console.log("in router.post  /getslots");
    console.log('we are looking for room id ', req.body.room);
    slotsArray = [];  // resets array to empty
    pg.connect(connectionString, function(err, client, done) {  // connecting to database
      if (err) {     // check for errors
      console.log(err);
    } else { // start selection criteria
        //  var search = client.query("SELECT occupant_room.id, first_name, last_name, guest_name, room_type, capacity, room_number, check_in, check_out, price FROM occupant_room JOIN users ON occupant_room.users_id = users.id JOIN rooms ON occupant_room.rooms_id = rooms.id WHERE rooms_id=" + req.body.room);
         var search = client.query("SELECT * FROM occupant_room WHERE rooms_id=" + req.body.room);
         search.toString();
        //  console.log("in /getSlots app: ", slotsInfo);
          rows = 0;
          search.on('row', function(row) {  // pushing to array
            console.log('row is now', row);
            slotsArray.push(row);
          });  // end query push
          search.on('end', function() {  // sending to scripts
            // console.log("slots info from app.post in app", slotsArray);
            return res.json(slotsArray);
          }); // end function
          done(); // signals done
          pg.end();
      } // end else (for success)
    }); // end pg connect function

}); // end /getSlotsfunction

//ROOM ASSIGNMENT ROUTES:

router.post('/getRoom2', function(req, res) { // pulling selected room info from database to display on room assignment page
    console.log("in rooms.js getroom2");
    console.log('req.body.events id is ', req.body.events_id);
    selectedRoom = [];  // resets array to empty for new room
    pg.connect(connectionString, function(err, client, done) {  // connecting
      if (err) {     // check for errors
      console.log(err);
    } else { // start selection criteria
        console.log("successful connection in /getroom2");
        // roomInfo = client.query("SELECT occupant_room.id, first_name, last_name, guest_name, room_type, capacity, room_number, check_in, check_out, price, event_name, hotel_name, notes FROM occupant_room JOIN users ON occupant_room.users_id = users.id JOIN rooms ON occupant_room.rooms_id = rooms.id JOIN events ON occupant_room.events_id = events.id JOIN hotels ON occupant_room.hotel_id = hotels.id WHERE events.id='" + req.body.events_id + "'");
        roomInfo=client.query("SELECT * FROM rooms WHERE events_id=" + req.body.events_id);
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


router.post('/saveSlot/:id', function(req, res) {
    var slot = req.body;
    var id = req.params.id;
    pg.connect(connectionString, function(err, client, done) {
      if (err){  //connection error
        console.log('error at pg connect.');
        res.sendStatus(500);
      } // end connection error
      console.log("in saveSlot client.query update");
      client.query('UPDATE occupant_room ' +
        'SET guest_name = $1, ' +
        'rooms_id = $2, ' +
        'users_id = $3 ' +
        'WHERE id = $4',
         [slot.guest_name, slot.rooms_id, slot.users_id, id],
      function(err, result){
        done();
        if (err) {
          console.log("error in rooms.js:");
           console.log(err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(204);  // success
      });
    }); //end connection
}); //end /saveSlot function

router.put( '/saveGuest', function( req, res ) {
      console.log(req.body);
      // var id = req.params.id;
      var name = req.body;
  // if (err) {  //connection error
  //   console.log(err);
  //   res.sendStatus(500);
  //   } // end connection error
                pg.connect( connectionString, function( err, client, done ) {
                  if( err ) {
                    console.log( 'Unable to update table.' );
                  } else {
                  client.query( 'UPDATE occupant_room SET guest_name = $1 WHERE id = $2',
                  [name.guest_name, name.id],
                  function(err, result){
                    done();
                    if (err) {
                      console.log("error in rooms.js:");
                       console.log(err);
                        res.sendStatus(500);
                        return;
                    }
                    res.sendStatus(204);  // success
                  });
                } //end connection
            }); //end /saveSlounction
          });


module.exports = router;
