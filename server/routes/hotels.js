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

module.exports = router;
