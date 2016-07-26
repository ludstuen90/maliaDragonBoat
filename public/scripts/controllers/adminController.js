DRGNBT.controller('adminController', ['$scope', '$http', function($scope, $http){
console.log('in adminController');
    var objectToSend={}; // creates global object to send

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
         }); // end http
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



     }]); // end adminController
