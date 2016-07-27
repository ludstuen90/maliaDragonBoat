DRGNBT.controller('homeController', [ '$scope', '$http', function ( $scope, $http ) {


  $scope.assignEvent = function(eventId){
      console.log(eventId);
      sessionStorage.setItem("eventId", eventId);
    // console.log("We have saved mango as ", $scope.mango);
  };

}]); // End of home controller
