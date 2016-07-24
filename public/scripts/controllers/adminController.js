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
           notes_events : $scope.events_notes
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

     }]); // end adminController
