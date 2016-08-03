DRGNBT.controller('adminController', ['$scope', '$http', '$window', '$filter', function($scope, $http, $window, $filter){
// console.log('in adminController');
    var objectToSend={}; // creates global object to send
    $scope.eventToDisplay= [];


    $scope.assignEvent = function(eventId){
        console.log(eventId);
        sessionStorage.setItem("eventId", eventId);
      $scope.mango = sessionStorage.getItem("eventId");
      console.log("mango is: ", $scope.mango);


        $scope.tabChange = function($scope) {
          $scope.selectedTab = 0;

         	console.log($scope.selectedTab);
           $scope.changeNavigation = function() {
             console.log('Hello World1');
             $scope.selectedTab = 2;
           };
         };

         $scope.tabChange(1);


               // console.log("We have saved mango as ", $scope.mango);
    };


     $scope.createEvent = function() { // pulls event info and sends to database
         event.preventDefault();
         objectToSend ={  // package inputs into object to send
           event_name : $scope.eventName,
           address_one : $scope.addressOne,
          //  address_two : $scope.addressTwo,
           event_city : $scope.event_city,
           event_state_province : $scope.event_state_province,
           event_url : $scope.event_url,
           company : $scope.company,
          //  results_url : $scope.results_url,
          //  schedule_url : $scope.schedule_url,
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


    // $scope.eventList=[];
$scope.events = '';
     $scope.eventRequest = function() { // gets info for current event to display on for Admin survey page
       console.log("in eventRequest function in adminController");
       event.preventDefault();
       $http({   // gets recordset via GET
         method: 'GET',
         url: '/eventRequest',
       }).then(function(response){  // success call - runs function with response parameter
         $scope.events = response.data;  // pulls the data from server and sets to global var eventList
         console.log('$scope.events is ', $scope.events);
       }, function myError(response){
         console.log(response.statusText);
       }); // end then response
     }; // end eventRequest function
    //  var $scope.surveyList = [];


    $scope.data = {
        cb1: false,
      };

$scope.saveDial = function(){
  console.log('button works');
  console.log($scope.data.cb1);

  console.log($scope.eventToDisplay.event_name, 'will be updated to ', $scope.data.cb1);




};
$scope.subEvent = function(){
  console.log('coffee is the way, and the life');
  console.log($scope.eventChosen);

  for (var i = 0; i < $scope.events.length; i++){
    if($scope.events[i].id == $scope.eventChosen) {
      $scope.eventToDisplay = $scope.events[i];
    }
  }
  console.log($scope.eventToDisplay);
  // console.log('eventPhase: ', $scope.eventToDisplay.hotel_phase);
console.log($scope.data.cb1 = $scope.eventToDisplay.hotel_phase);

  // if($scope.eventDoDisplay.data.cb1)

var showThisEvent = {
  id: $scope.eventChosen
};

$http({
  method: 'POST',
  url: '/surveyShow',
  data: showThisEvent
}).then(function(response){
  console.log('from survey show we have', response.data);
  $scope.surveyList = response.data;
});


};


    //  $scope.surveyRequest = function() { // gets survey results for current event for Admin survey page
    //    $http({   // gets recordset via GET
    //      method: 'GET',
    //      url: '/surveyResults',
    //    }).then(function(response){  // success call - runs function with response parameter
    //      $scope.surveyList = response.data;  // pulls the data from server and sets to global var surveyList
    //    }); // end then response
    //  }; // end surveyRequest function
// $scope.surveyRequest();
    //  $scope.eventAndSurveyRequest = function() {  //runs both eventRequest and surveyRequest queries to display event and survey results on adminSurvey.html
    //    $scope.eventRequest();
    //    $scope.surveyRequest();
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
// $scope.hotelRequest();


// };


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
//GOTTA FINISH BUILDING THIS OUT LATER
$scope.assignHotel = function(eventChosen){
  console.log('in assignHotel');
  console.log($scope.selectHotel);
  console.log($scope.eventChosen);
  var sendID = { id : $scope.selectHotel };
  $http({
  method: 'PUT',
  url: '/assignHotel/' + eventChosen,
  data: sendID
  });
  console.log('out of js.assignHotel');
};

     var hotelRooms=[];

     var roomBeds=[];


// TAB FUNCTIONALITY ----------------------------------
     $scope.tabs = [{
            title: 'Select Event',
            url: 'one.tpl.html'
        }, {
             title: 'Survey Results',
             url: 'two.tpl.html'
         }, {
             title: 'Hotel List',
             url: 'three.tpl.html'
         }, {
             title: 'Hotel Room Builder',
             url: 'four.tpl.html'
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
    // hotels_id : $scope.hotels_id,
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
    $scope.getRoomAndCreateSlots();
  });
  // CLEARS Room INPUT FIELDS
  // $scope.hotels_id = "";
  $scope.events_id = "";
    $scope.room_type = "";
    $scope.capacity = "";
    $scope.price = "";
    $scope.check_in = "";
    $scope.check_out = "";
    $scope.notes = "";
};

var roomsToGet;
$scope.roomToShow = [];
$scope.newestRoom = [];

$scope.getRoomAndCreateSlots = function() {
  console.log("in getRoomAndCreateSlots function in adminController");
  roomsToGet = {
    events_id : roomToSend.events_id,
  };
  $http({   // gets recordset via POST
    method: 'POST',
    url: '/getRoom',
    data: roomsToGet
  }).then(function(response) {
    $scope.roomToShow = response.data;
    console.log("at end of getRoom, roomToShow: ", $scope.roomToShow);
    $scope.newestRoom=$scope.roomToShow.slice(0,1); // slices newest Room / highest room ID number into new array for createSlots function so it doesn't duplicate slots
    $scope.createSlots();
  });
}; // end getRoom function

$scope.createSlots = function() {
  console.log("roomToShow in createSlots: ", $scope.newestRoom);
  $http({
    method: 'POST',
    url: '/createSlots',
    data: $scope.newestRoom
    // data: roomSlots
  }).then(function(){
  });
};

$scope.getRoom = function() {
  console.log("in getRoom function in adminController");
  roomsToGet = {
    events_id : roomToSend.events_id,
  };
  $http({   // gets recordset via POST
    method: 'POST',
    url: '/getRoom',
    data: roomsToGet
  }).then(function(response) {
    $scope.roomToShow = response.data;
  });
}; // end getRoom function

var roomId;

$scope.deleteSlots = function(recordid) {
  console.log("in deleteSlots", recordid);
  var sendId = {id: recordid};
  roomId=sendId;
  $http({
    method: 'DELETE',
    url: '/deleteSlots' ,
    data: sendId,
    headers:  {'Content-Type': 'application/json;charset=utf-8'}
  }).then(function(){
    $scope.deleteRoom(recordid);
  });

};

$scope.deleteRoom = function(roomId){
  console.log('in delete room', roomId);
  var sendId = {id: roomId};
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


// FUNCTION FOR MOVING FROM ADMIN TAB 1 TO TAB 2 **NOT WORKING**
    $scope.selectEvent = function(eventId) {
      // assignEvent(eventId);
      console.log("in selectEvent assignEvent complete");
       $scope.currentTab = 'two.tpl.html';
    };


//ROOM ASSIGNMENT PAGE FUNCTIONS
    $scope.getRoom2 = function() {  //gets rooms for that event to populate "cards"
      console.log("in getRoom2 function in adminController");
      console.log($scope.events_id);
      roomsToGet = {
        events_id : $scope.events_id,
      };
      console.log(roomsToGet);
      $http({   // gets recordset via POST
        method: 'POST',
        url: '/getRoom2',
        data: roomsToGet
      }).then(function(response) {
        // $scope.showRoom2();
        $scope.roomToShow = response.data;

          console.log('room to show returns' , $scope.roomToShow);
      }).then(function(){

        for (i = 0; i < $scope.roomToShow.length; i++) {
          $scope.theObject = $scope.roomToShow[i];
          console.log($scope.theObject.id);
          $scope.sendRoom = $scope.theObject.id;
          console.log('we are about to send ', $scope.sendRoom);
          $scope.getSlots($scope.sendRoom);
        }

      // $scope.getSlots(1);


      });
    }; // end getRoom function

    // $scope.showRoom2 = function() {
    // console.log("in show room function in adminController");
    // $http({   // gets recordset via GET
    //   method: 'GET',
    //   url: '/showRoom2',
    // }).then( function(response){  // success call - runs function with response parameter
    //   $scope.roomToShow = response.data;
    //   console.log('room to show returns' , $scope.roomToShow);
    // }, function myError(response){
    //   console.log(response.statusText);
    // }// end error function
    // ); // end then response
    // }; // end showRoom function

$scope.showMeSlots = function(){
  console.log('slots to show are ', $scope.slotsToShow);
  console.log('and rooms to show is ', $scope.roomToShow);
};


  // var slotsToGet;

  $scope.getSlots = function(stuff) {
    console.log("in getSlots function in adminController");
    console.log('now, we are searching for', stuff);
    slotsToGet = {
      room : stuff,
    };
    console.log("slotsToGet: ", slotsToGet);
    $http({   // gets recordset via POST
      method: 'POST',
      url: '/getSlots',
      data: slotsToGet
    }).then(function(response) {
      // $scope.showSlots();
      console.log('and for ', stuff,' the slots we will show are: ', response.data);
      $scope.slotsToShow = response.data;
    });
  }; // end getSlotsfunction

// $scope.slotsToShow= [];

    // $scope.showSlots = function() {
    // console.log("in show slots function in adminController");
    // $http({   // gets recordset via GET
    //   method: 'GET',
    //   url: '/showSlots',
    // }).then( function(response){  // success call - runs function with response parameter
    //   $scope.slotsToShow = response.data;
    //   console.log("showSlots slotsToShow:", $scope.slotsToShow);
    // }, function myError(response){
    //   console.log(response.statusText);
    // }// end error function
    // ); // end then response
    // }; // end showRoom function

    $scope.updateOccupants=function(recordguest_name, recordusers_id, recordrooms_id, recordid) {
    console.log('in updateOccupants');
    console.log("data from updateOccupants: ", recordid, recordrooms_id, recordguest_name, recordusers_id );
    console.log("updateOccupants id: ", recordid);
    var id=recordid;
    var data={
      guest_name: recordguest_name,
      users_id: recordusers_id,
      rooms_id: recordrooms_id
    };
    console.log(data);
    $http({
      method: 'POST',
      url: '/saveSlot/' +id,
      data: data
    });
    };


$scope.pageLoad = function(){

$http.get('loadHotels').then(function(response){
  $scope.hotelSelect = response.data;
  console.log(response.data);
});

$scope.hotelRequest();



$scope.fetchEvents = function(){
  $http({
    method: 'GET',
    url: '/eventPopulate'
  }).then( function( response ) {
    $scope.alltheEvents = response.data;
    console.log('and the response data is: ',   $scope.alltheEvents);
    console.log('events is ', $scope.events);
  });
};

$scope.hotelRequest();
$scope.eventRequest();
$scope.fetchEvents();

};


}]); // end adminController
