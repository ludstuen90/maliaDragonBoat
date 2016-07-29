DRGNBT.controller('viewEvent', [ '$scope', '$http', function ( $scope, $http ) {
console.log('in view event');


$scope.eventData = [];
$scope.hello = sessionStorage.getItem("username");


  $scope.assignEvent = function(eventId){
      console.log(eventId);
      sessionStorage.setItem("eventId", eventId);
    // console.log("We have saved mango as ", $scope.mango);
  };


  $scope.getInformation = function(){

//Queries the server for the current event, and then assigns that information to
// an Angular object (eventData), which appears on the DOM
    console.log(sessionStorage.getItem("eventId"));
    $scope.mango = sessionStorage.getItem("eventId");
    var objToSend = {
      eventId: $scope.mango
    };

    $http({   // gets receive information related to current event
      method: 'POST',
      url: '/eventData',
      data: objToSend
    }).then(function(response){
      console.log("request completed");
      $scope.eventData = response.data[0];
      console.log($scope.eventData);
    });

    //Queries the server to see if a the logged in user has filled out a survey for the current eventData

$scope.surveysCompleted = "";


$scope.filterResults = function(){
  console.log('in filter,and reuslts are', $scope.surveysCompleted);
  console.log('length of sureys completed', $scope.surveysCompleted.length);
console.log('user is ', $scope.hello);
  for (var i = 0; i < ($scope.surveysCompleted.length); i++){
    if ($scope.surveysCompleted[i].username === $scope.hello) {
      console.log('in this test, we compare ', $scope.surveysCompleted[i].username, 'and ', $scope.hello);
      console.log('yes, user has filled out survey!');
      $scope.pageMessage= "Thanks for filling out your survey! You rock!";
      return;
    }
    else {
      console.log('in this test, we compare ', $scope.surveysCompleted[i].username, 'and ', $scope.hello);
      console.log('no, user has not filled out a survey');
      $scope.pageMessage = "We haven't yet received a survey from you. Here's your link";
    }
  }
};






  };

// This test button exists to provide a route to send the username and event ID
// to the server. Now that this exists, I will build a query that checks to see
// 1. what stage of the booking process is this event in?
//      IF hotel phase, will display link to hotel block
//      ELSE IF survey phase, will check the following:
//            has user completed their survey?
//            IF YES: Thank user for completing survey!
//            ELSE IF: Prompt user to complete survey for selected event

$scope.testButton = function(){
  console.log('test button clicked');
  var surveyInfoToSend = {
    username: $scope.hello,
    eventId: $scope.mango
  };

  $http({
    method: 'POST',
    url: '/eventPhase',
    data: surveyInfoToSend
  }).then(function(response){
    console.log('hotel phase for this event is: ', response.data[0].hotel_phase);
    $scope.hotel_phase = response.data[0].hotel_phase;

      if ($scope.hotel_phase) {
        $scope.pageMessage = "we will display hotel room selection!";
      }

      else {
        console.log('made it to else');

        $scope.pageMessage = "No, we will not display the hotel room selection";

        $http({
          method: 'GET',
          url: '/surveyResults',
        }).then(function(response){
          $scope.surveysCompleted = response.data;
          console.log($scope.surveysCompleted);
        }).then(function(){
          $scope.filterResults();
        });


      }








  });








};


 }]); // End of survey controller
