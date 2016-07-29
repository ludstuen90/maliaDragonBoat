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



//
$scope.userSurveyCompletion = function(){
  console.log('in filter,and reuslts are', $scope.surveysCompleted);
  console.log('length of sureys completed', $scope.surveysCompleted.length);
console.log('user is ', $scope.hello);
  for (var i = 0; i < ($scope.surveysCompleted.length); i++){
    if (($scope.surveysCompleted[i].username == $scope.hello)&&( $scope.surveysCompleted[i].events_id == $scope.mango)) {
      console.log('in this test, we compare ', $scope.surveysCompleted[i].username, 'and ', $scope.hello);
      console.log('as well as ', $scope.surveysCompleted[i].events_id, ' and ', $scope.mango);
      console.log('yes, user has filled out survey!');
      $scope.pageMessage= "Thanks for filling out your survey! You rock!";
      return;
    }
    else {
      console.log('in this test, we compare ', $scope.surveysCompleted[i].username, 'and ', $scope.hello);
      console.log('as well as ', $scope.surveysCompleted[i].events_id, ' and ', $scope.mango);

      console.log('no, user has not filled out a survey');
      $scope.pageMessage = "We haven't yet received a survey from you. Here's your link";
    }
  }
};






  };



//this function queries the server to see what phase the event is in -- if it is in the survey
// phase, or the hotel room booking phase
// after this, it fires the function 'userSurveyCompletion' to see if the logged in user has completed
// a survey required for each event

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
          console.log('surveysCompleted is ', $scope.surveysCompleted);
        }).then(function(){
          $scope.userSurveyCompletion();
        });


      }








  });








};


 }]); // End of survey controller
