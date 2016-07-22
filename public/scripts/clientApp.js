var DRGNBT = angular.module('DRGNBT', []);

DRGNBT.controller('index', ['$scope', '$http', function($scope, $http){
  $scope.hello= "it's me";


}]);

CRMLJA.controller('LoginController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
  console.log('log in controller loaded');
    $scope.user = {
      username: '',
      password: ''
    };
    $scope.message = '';

    $scope.login = function() {
      console.log('login function clicked');
      if($scope.user.username ==='' || $scope.user.password === '') {
        console.log("this is username: ");
        console.log($scope.user.username);
        $scope.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            $window.location.href = '/landing';
          } else {
            console.log('Log in attempt was a failure: ', response);
            $scope.message = "Incorrect User Credentials";
          }
        });
      }
    };

    $scope.registerUser = function() {
      if($scope.user.username === '' || $scope.user.password === '') {
        $scope.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/register', $scope.user).then(function(response) {
          console.log('success');
          $location.path('/home');
        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again.";
        });
      }
    };

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
