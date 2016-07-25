DRGNBT.controller('homeController', [ '$scope', '$http', function ( $scope, $http ) {


  $scope.assignEvent = function(dog){
      console.log(dog);
      // sessionStorage.setItem("aesop", "Corgi");
    // $scope.mango = sessionStorage.getItem("aesop");
    // console.log("We have saved mango as ", $scope.mango);
  };


  $scope.showEvent = function(){
    console.log(sessionStorage.getItem("event"));
  };

 }]); // End of survey controller
