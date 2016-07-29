var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/groupDB';

router.post('/newHotel', function(req, res){
  var hotel = req.body;
  pg.connect(connectionString, function(err, client, done){
    console.log('In newHotel', hotel);
    client.query("INSERT INTO hotels ( hotel_name, hotel_address, hotel_city, hotel_state_province, hotel_zip, hotel_phone, hotel_url, hotel_notes) values ($1, $2, $3, $4, $5, $6, $7, $8 )",
    [hotel.hotel_name, hotel.hotel_address, hotel.hotel_city, hotel.hotel_state_province, hotel.hotel_zip, hotel.hotel_phone, hotel.hotel_url, hotel.hotel_notes]);
    res.send(true);
    done();
  });
});


router.get('/hotelRequest', function(req, res){
  console.log('in hotelRequest');
  var hotelGet = [];
  pg.connect(connectionString, function(err, client, done){
    if( err ){
      console.log( err );
    }
    else{
      var queriedHotel = client.query("SELECT * FROM hotels;");
      queriedHotel.on('row', function(row){
        hotelGet.push(row);
      });
      queriedHotel.on('end', function(){
        return res.json(hotelGet);
      });
      done();
    } // end no err
  });
});


router.get( '/hotelBlock', function( req, res ) {
  console.log( 'In /hotelBlock.' );
  var hotelBlockDisplay = [];
  pg.connect( connectionString, function( err, client, done ) {
    var hotelQuery = client.query( "SELECT occupant_room.id, first_name, last_name, guest_name, room_type, capacity, room_number, check_in, check_out, price FROM occupant_room JOIN users ON occupant_room.users_id = users.id JOIN rooms ON occupant_room.rooms_id = rooms.id;" );
    hotelQuery.on( 'row', function( row ) {
      hotelBlockDisplay.push( row );
      console.log( '/hotelBlock returned with ' + hotelBlockDisplay + ' which contains ' + hotelBlockDisplay.room_type, hotelBlockDisplay.capacity + '.' );
    });
    if( err ) {
      console.log( 'Unable to retrieve hotel block information.' );
    } else {
      hotelQuery.on( 'end', function() {
        return res.json( hotelBlockDisplay );
      });
      done();
    }
   });
  });

  router.delete('/deleteHotel', function (req, res){
    console.log('in deleteHotel.js');
    pg.connect(connectionString, function(err, client, done){
      client.query("DELETE FROM hotels WHERE id=" + req.body.id);
      if(err){
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
      done();
      console.log('Hotel deleted');
    });
  });//end DELETE

router.post('/assignHotel', function (req, res){
  console.log('in assignHotel');
  pg.connect(connectionString, function(err, client, done){
    client.query("INSERT INTO events ")
  })
});

module.exports = router;
