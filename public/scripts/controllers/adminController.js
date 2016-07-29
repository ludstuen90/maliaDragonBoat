DRGNBT.controller('adminController', ['$scope', '$http', '$window', '$filter', function($scope, $http, $window, $filter){
console.log('in adminController');
    var objectToSend={}; // creates global object to send



    $scope.assignEvent = function(eventId){
        console.log(eventId);
        sessionStorage.setItem("eventId", eventId);
      $scope.mango = sessionStorage.getItem("eventId");
      // console.log("We have saved mango as ", $scope.mango);
    };


     $scope.createEvent = function() { // pulls event info and sends to database
         event.preventDefault();
         objectToSend ={  // package inputs into object to send
           event_name : $scope.eventName,
           address_one : $scope.addressOne,
           address_two : $scope.addressTwo,
           event_city : $scope.event_city,
           event_state_province : $scope.event_state_province,
           event_url : $scope.event_url,
           company : $scope.company,
           results_url : $scope.results_url,
           schedule_url : $scope.schedule_url,
           begin_date : $scope.begin_date,
           end_date : $scope.end_date,
           notes_events : $scope.notes_events
           }; // end object
           console.log("in adminApp createEvents");
           console.log(objectToSend.begin_date);
           console.log(objectToSend.end_date);

         $http({  // sends object via POST to create event in database
           method: 'POST',
           url: '/createEvent',
           data: objectToSend
         }).then(function(){
           $http({
             method:'GET',
             url: '/lastEvent'
           }).then(function(response){
             console.log(response.data[0].id);
             sessionStorage.setItem("eventId", response.data[0].id);
           }).then(function(){
             $window.location.href = '/#/viewEvent';
           });
         }); // end http
  //clears event fields
       $scope.eventName = '';
       $scope.addressOne = '';
       $scope.addressTwo = '';
       $scope.event_city = '';
       $scope.event_state_province = '';
       $scope.event_url = '';
       $scope.company = '';
       $scope.results_url = '';
       $scope.schedule_url = '';
       $scope.begin_date = '';
       $scope.end_date = '';
       $scope.notes_events = '';

}; //end createEvent function


    $scope.eventList=[];

     $scope.eventRequest = function() { // gets info for current event to display on for Admin survey page
       console.log("in eventRequest function in adminController");
       event.preventDefault();
       $http({   // gets recordset via GET
         method: 'GET',
         url: '/eventRequest',
       }).then( function(response){  // success call - runs function with response parameter
       // console.log(response.data);
         eventList = response.data;  // pulls the data from server and sets to global var eventList
         console.log($scope.eventList);
       }, function myError(response){
         console.log(response.statusText);
       }// end error function
       ); // end then response
     }; // end eventRequest function

     var surveyList=[];

     $scope.surveyRequest = function() { // gets survey results for current event for Admin survey page
       console.log("in surveyRequest function in adminController");
       event.preventDefault();
       $http({   // gets recordset via GET
         method: 'GET',
         url: '/surveyRequest',
       }).then( function(response){  // success call - runs function with response parameter
       // console.log(response.data);
         surveyList = response.data;  // pulls the data from server and sets to global var surveyList
         console.log($scope.surveyList);
       }, function myError(response){
         console.log(response.statusText);
       }// end error function
     ); // end then response
     }; // end surveyRequest function

    //  $scope.eventAndSurveyRequest = function() {  //runs both eventRequest and surveyRequest queries to display event and survey results on adminSurvey.html
    //    eventRequest();
    //    surveyRequest();
    //  };

     var hotelList=[];


//CREATE a hotel FUNCTIONALITY
     $scope.newHotel = function(){
       hotelToSend = {
         hotel_name : $scope.hotel_name,
         hotel_address : $scope.hotel_address,
         hotel_city : $scope.hotel_city,
         hotel_state_province : $scope.hotel_state,
         hotel_zip : $scope.hotel_zip,
         hotel_phone : $scope.hotel_phone,
         hotel_url : $scope.hotel_url,
         hotel_notes : $scope.hotel_notes
       };
       console.log(hotelToSend);
       $http({
         method: 'POST',
         url: '/newHotel',
         data: hotelToSend
       }).then(function(){
         $scope.hotelRequest();
       });

       // CLEARS HOTEL INPUT FIELDS
          $scope.hotel_name = '';
          $scope.hotel_address = '';
          $scope.hotel_city = '';
          $scope.hotel_state = '';
          $scope.hotel_zip = '';
          $scope.hotel_phone = '';
          $scope.hotel_url = '';
          $scope.hotel_notes = '';
     };//end HOTEL creation

     $scope.hotelRequest = function() {
      //  event.preventDefault();
       $http({   // gets recordset via GET
         method: 'GET',
         url: '/hotelRequest',
       }).then( function(response){
         $scope.hotels = response.data;
       }, function myError(response){
         console.log(response.statusText);
       }// end error function
       ); // end then response
     }; // end hotelRequest function
$scope.hotelRequest();

$scope.deleteHotel = function(hotelID){
  console.log('in delete hotel');
  var sendID = {id: hotelID};
  $http({
    method: 'DELETE',
    url: '/deleteHotel',
    data: sendID,
    headers: {'Content-Type': 'application/json;charset=utf-8'}
  }).then(function(){
    $scope.hotelRequest();
  });
};

$scope.assignHotel = function(hotelID){
  console.log('in assignHotel');
  var sendID = {id : hotelID};
  $http({
  method: 'POST',
  url: '/assignHotel',
  data: sendID
  });
};

     var hotelRooms=[];

     var roomBeds=[];


// TAB FUNCTIONALITY ----------------------------------
     $scope.tabs = [{
             title: 'Survey Results',
             url: 'one.tpl.html'
         }, {
             title: 'Hotel List',
             url: 'two.tpl.html'
         }, {
             title: 'Hotel Room Builder',
             url: 'three.tpl.html'
     }];

     $scope.currentTab = 'one.tpl.html';

     $scope.onClickTab = function (tab) {
         $scope.currentTab = tab.url;
     };

     $scope.isActiveTab = function(tabUrl) {
         return tabUrl == $scope.currentTab;
     };

     $scope.showEvent = function(){
       console.log(sessionStorage.getItem("eventId"));
     };

// ROOM BUILDER FUNCTIONALITY -----------------------------

    //ADD A ROOM -------------------

var roomToSend={};

$scope.addRoom = function() {
  console.log("in addRoom function in adminController");
  roomToSend = {
    hotels_id : $scope.hotels_id,
    events_id : $scope.events_id,
    room_type : $scope.room_type,
    capacity : $scope.capacity,
    price : $scope.price,
    check_in : $scope.check_in,
    check_out : $scope.check_out,
    notes : $scope.notes
    //need event id and hotel id
  };
  console.log(roomToSend);
  $http({
    method: 'POST',
    url: '/addRoom',
    data: roomToSend
  }).then(function(){
    $scope.getRoom();
  });
  // CLEARS Room INPUT FIELDS
  $scope.hotels_id = "";
  $scope.events_id = "";
    $scope.room_type = "";
    $scope.capacity = "";
    $scope.price = "";
    $scope.check_in = "";
    $scope.check_out = "";
    $scope.notes = "";
};

$scope.getRoom = function() {
  console.log("in getRoom function in adminController");
  roomsToGet = {
    hotels_id : roomToSend.hotels_id,
    events_id : roomToSend.events_id,
  };
  $http({   // gets recordset via POST
    method: 'POST',
    url: '/getRoom',
    data: roomsToGet
  }).then(function() {
    $scope.showRoom();
  });
}; // end getRoom function

$scope.roomToShow = [];

$scope.showRoom = function() {
console.log("in show room function in adminController");
$http({   // gets recordset via GET
  method: 'GET',
  url: '/showRoom',
}).then( function(response){  // success call - runs function with response parameter
// console.log(response.data);
  $scope.roomToShow = response.data;
  console.log($scope.roomToShow);
}, function myError(response){
  console.log(response.statusText);
}// end error function
); // end then response
}; // end showRoom function

$scope.deleteRoom = function(recordid){
  console.log('in delete room', recordid);
  var sendId = {id: recordid};
  $http({
    method: 'DELETE',
    url: '/deleteRoom' ,
    data: sendId,
    headers:  {'Content-Type': 'application/json;charset=utf-8'}
  }).then(function(){
   $scope.getRoom();
  });
};


$scope.makeSqlHappy=function(recordroom_number, recordroom_type, recordcapacity, recordprice, recordcheck_in, recordcheck_out, recordnotes, recordid) {
console.log('in makeSqlHappy');
console.log("data from makeSqlHappy: ", recordid, recordroom_number, recordroom_type, recordcapacity, recordprice, recordcheck_in, recordcheck_out, recordnotes);
console.log("makeSqlHappy's stinkin id: ", recordid);
var id=recordid;
var data={
  room_number: recordroom_number,
  room_type: recordroom_type,
  capacity: recordcapacity,
  price: recordprice,
  check_in: recordcheck_in,
  check_out: recordcheck_out,
  notes: recordnotes
};
console.log(data);
$http({
  method: 'POST',
  url: '/saveRoom/' +id,
  data: data
});
};
// END XEDITABLE ROOM ASSIGNER CODE -----------------






}]); // end adminController
