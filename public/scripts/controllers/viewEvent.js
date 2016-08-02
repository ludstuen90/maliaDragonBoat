DRGNBT.controller('viewEvent', [ '$scope', '$http', function ( $scope, $http ) {
$scope.eventData = [];
$scope.hello = sessionStorage.getItem("username");
  $scope.assignEvent = function(eventId){
      sessionStorage.setItem("eventId", eventId);
    // console.log("We have saved mango as ", $scope.mango);
  };
  $scope.getInformation = function(){
//Queries the server for the current event, and then assigns that information to
// an Angular object (eventData), which appears on the DOM
    $scope.mango = sessionStorage.getItem("eventId");
    var objToSend = {
      eventId: $scope.mango
    };
    $http({   // gets receive information related to current event
      method: 'POST',
      url: '/eventData',
      data: objToSend
    }).then(function(response){
      $scope.eventData = response.data[0];
      $scope.getHotelInformation();
      console.log(response.data);
    });
    //Queries the server to see if a the logged in user has filled out a survey for the current eventData

$scope.surveysCompleted = "";
//
$scope.userSurveyCompletion = function(){
      for (var i = 0; i < ($scope.surveysCompleted.length); i++){
        if (($scope.surveysCompleted[i].username == $scope.hello)&&( $scope.surveysCompleted[i].events_id == $scope.mango)) {
          console.log('surveys completed', $scope.surveysCompleted);
          console.log("username now checking", $scope.surveysCompleted[i].username);
          console.log('scope.hello', $scope.hello);
          console.log('surveysCompletedNow checking ', $scope.surveysCompleted[i].events_id);
          console.log('scope.mango is ', $scope.mango);
          $scope.pageMessage= "Thanks for filling out your survey! You rock! You'll receive an email when Hotel room selection is ready.";
          $scope.pageMessage2= "";
          $scope.pageMessage3 = "";
          return;
        }
        else {
          $scope.pageMessage = "We haven't yet received any information from you yet.";
          $scope.pageMessage2= "/#surveyStep1";
          $scope.pageMessage3 = "Click here to fill out the survey";
        }
      }
    };
  };
//this function queries the server to see what phase the event is in -- if it is in the survey
// phase, or the hotel room booking phase
// after this, it fires the function 'userSurveyCompletion' to see if the logged in user has completed
// a survey required for each event

$scope.getHotelInformation = function(){
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
    $scope.hotel_phase = response.data[0].hotel_phase;
      if ($scope.hotel_phase) {
        $scope.pageMessage = "We're working on assignign hotel rooms. If you'll be staying with us, you can ";
        $scope.pageMessage2= "/#roomAssignment";
        $scope.pageMessage3 = "see the hotel block assignments here.";      }
      else {
        $http({
          method: 'GET',
          url: '/surveyResults',
        }).then(function(response){
          $scope.surveysCompleted = response.data;
        }).then(function(){
          $scope.userSurveyCompletion();
        });
      }
  });
};
 }]); // End of survey controller
