DRGNBT.controller('adminController', ['$scope', '$http', function($scope, $http){

    var objectToSend={}; // creates global object to send

     $scope.createEvent = function() { // pulls event info and sends to database
         event.preventDefault();
         objectToSend ={  // package inputs into object to send
           event_name: $scope.eventName,
           address_one: $scope.addressOne,
           address_two: $scope.addressTwo,
           city: $scope.city,
           state_province: $scope.state_province,
           url: $scope.url,
           company: $scope.company,
           results_url: $scope.results_url,
           schedule_url: $scope.schedule_url,
           begin_date: $scope.begin_date.value,
           end_date: $scope.end_date.value
           }; // end object
           console.log("in adminApp createEvents");
         $http({  // sends object via POST to create event in database
           method: 'POST',
           url: '/createEvent',
           data: objectToSend
         }); // end http
       }; //end createEvent function

     }]); // end adminController
