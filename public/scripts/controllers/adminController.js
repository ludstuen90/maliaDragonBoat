DRGNBT.controller('adminController', ['$scope', '$http', '$window', function($scope, $http, $window){
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




    $scope.eventAndSurveyRequest = function() {  //runs both eventRequest and surveyRequest queries to display event and survey results on adminSurvey.html
      eventRequest();
      surveyRequest();
    };

    var eventList=[];

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

     var hotelList=[];

//add a hotel FUNCTIONALITY
     $scope.newHotel = function(){
       hotelToSend = {
         hotel_name : $scope.hotel_name,
         hotel_address : $scope.hotel_city,
         hotel_city : $scope.hotel_city,
         hotel_state_province : $scope.hotel_state,
         hotel_zip : $scope.hotel_zip,
         hotel_phone : $scope.hotel_phone,
         hotel_url : $scope.hotel_url,
         hotel_notes : $scope.hotel_notes
       };
       $http({
         method: 'POST',
         url: '/newHotel',
         data: hotelToSend
       });
       // CLEARS HOTEL INPUT FIELDS
          $scope.hotel_name = '';
          $scope.hotel_city = '';
          $scope.hotel_state_province = '';
          $scope.hotel_zip = '';
          $scope.hotel_url = '';
          $scope.hotel_notes = '';
     };//end HOTEL creation

     $scope.hotelRequest = function() { // gets hotel list for Admin survey page
       console.log("in hotelRequest function in adminController");
       event.preventDefault();
       $http({   // gets recordset via GET
         method: 'GET',
         url: '/hotelRequest',
       }).then( function(response){  // success call - runs function with response parameter
       // console.log(response.data);
         surveyList = response.data;  // pulls the data from server and sets to global var surveyList
         console.log($scope.hotelList);
       }, function myError(response){
         console.log(response.statusText);
       }// end error function
       ); // end then response
     }; // end hotelRequest function

     var hotelRooms=[];

     var roomBeds=[];



// TAB FUNCTIONALITY ----------------------------------
     $scope.tabs = [{
             title: 'One',
             url: 'one.tpl.html'
         }, {
             title: 'Two',
             url: 'two.tpl.html'
         }, {
             title: 'Three',
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

}]); // end adminController
