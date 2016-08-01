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
    method: 'PUT',
    url: '/tableUpdate'
  }).then( function() {
  $http({
    method: 'GET',
    url: '/eventPopulate'
  }).then( function( response ) {
    $scope.alltheEvents = response.data;
    console.log('and the response data is: ');
    console.log( response.data );
  });
});
};
$scope.fetchEvents();


};

}]); // End of home controller
