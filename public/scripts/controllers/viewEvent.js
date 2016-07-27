DRGNBT.controller('viewEvent', [ '$scope', '$http', function ( $scope, $http ) {
console.log('in view event');





  $scope.assignEvent = function(eventId){
      console.log(eventId);
      sessionStorage.setItem("eventId", eventId);
    $scope.mango = sessionStorage.getItem("eventId");
    // console.log("We have saved mango as ", $scope.mango);
  };


  $scope.showEvent = function(){
    console.log(sessionStorage.getItem("eventId"));
  };

 }]); // End of survey controller
