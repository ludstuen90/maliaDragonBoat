var DRGNBT = angular.module('DRGNBT', []);

DRGNBT.controller('index', ['$scope', '$http', function($scope, $http){
  $scope.hello= "it's me";


}]);

DRGNBT.controller('login', ['$scope', '$http', function($scope, $http){


  $scope.user = {
    username: $scope.username,
    password: $scope.password
  };




$scope.login = function(){
  console.log('login clicked');
  console.log($scope.user);
};



}]);

console.log('hello!');
