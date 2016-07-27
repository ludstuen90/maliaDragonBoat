DRGNBT.controller('homeController', [ '$scope', '$http', '$window', function ( $scope, $http, $window ) {


  $scope.assignEvent = function(eventId){
      console.log(eventId);
      sessionStorage.setItem("eventId", eventId);
      $window.location.href = '/#/viewEvent';
    // console.log("We have saved mango as ", $scope.mango);
  };

}]); // End of home controller
