DRGNBT.controller('homeController', [ '$scope', '$http', function ( $scope, $http ) {


  $scope.assignEvent = function(dog){
      console.log(dog);
      sessionStorage.setItem("dog", dog);
    $scope.mango = sessionStorage.getItem("aesop");
    // console.log("We have saved mango as ", $scope.mango);
  };


  $scope.showEvent = function(){
    console.log(sessionStorage.getItem("dog"));
  };

 }]); // End of survey controller
