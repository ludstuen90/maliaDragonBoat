DRGNBT.controller('roomController', [ '$scope', '$http', '$window', function ( $scope, $http, $window ) {
      $scope.hello = "Hello";
      console.log('roomId is ', sessionStorage.getItem("roomId"));

      $scope.roomId = sessionStorage.getItem("roomId");
      var roomId = sessionStorage.getItem("roomId");
      var showSlots = {
        room: roomId
      };
      $http({
        method: 'POST',
        url: '/getSlots',
        data: showSlots
      }).then(function(response){
      console.log(response.data);
      $scope.guests = response.data;
      }).then(function(){
        $scope.guestsArray =  $.map($scope.guests, function(value, index){
            return [value];
          });
      });
      $scope.coffee = ['hello', 'it', 'is'];

      $scope.userlol = {
        name: 'coolman'
      };


      $scope.showMe = function(){
        console.log($scope.guests);
};

  $scope.seeRoom = function(roomId){
    console.log('fired with ', roomId);
    sessionStorage.setItem("roomId", roomId);
    $window.location.href = '/#/roomOccupants';
  };

$scope.runOnStart();
}]); // end roomController
