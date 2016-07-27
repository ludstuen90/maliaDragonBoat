DRGNBT.controller('viewEvent', [ '$scope', '$http', function ( $scope, $http ) {
console.log('in view event');


$scope.eventData = [];


  $scope.assignEvent = function(eventId){
      console.log(eventId);
      sessionStorage.setItem("eventId", eventId);
    // console.log("We have saved mango as ", $scope.mango);
  };


  $scope.showEvent = function(){
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





  };

 }]); // End of survey controller
