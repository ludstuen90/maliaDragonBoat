DRGNBT.controller('homeController', [ '$scope', '$http', '$window', function ( $scope, $http, $window ) {


  $scope.assignEvent = function(eventId){
      console.log(eventId);
      sessionStorage.setItem("eventId", eventId);
      $window.location.href = '/#/viewEvent';
    // console.log("We have saved mango as ", $scope.mango);
  };

$scope.hello = function(){
  $http({
    method: 'GET',
    url: '/hello'
  }).then(function(response){
    sessionStorage.setItem("username", response.data);
  });

$scope.fetchEvents = function(){
  $http({
    method: 'GET',
    url: '/eventPopulate'
  }).then( function( response ) {
    $scope.alltheEvents = response.data;
    console.log( response.data );
  });
};
$scope.fetchEvents();

// var separator = function( array ) {
//   for( i = 0; i < array.length; i++ ) {
//     var event = {
//       id: array.id,
//       name: array.name,
//       begin: array.begin_date,
//       end: array.end_date
//     };
//     console.log( event );
//   return event;
//   }
// };



};

}]); // End of home controller
