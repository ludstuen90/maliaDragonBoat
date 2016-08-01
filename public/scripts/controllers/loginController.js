
DRGNBT.controller('loginController', ['$scope', '$http', '$window', '$location',
function($scope, $http, $window, $location) {

    $scope.user = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: ''
    };

    $scope.message = '';

    $scope.login = function() {
      if($scope.user.username === '' || $scope.user.password === '') {
        $scope.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username) {

            $window.localStorage.setItem('username', response.data.username);
            // set to $scope
            $scope.userName = $window.localStorage.getItem('username');

            console.log("The user is....", $scope.userName);


            $window.localStorage.setItem('first_name', response.data.first_name);
            // set to $scope
            $scope.userName = $window.localStorage.getItem('first_name');

            $window.localStorage.setItem('last_name', response.data.last_name);
            // set to $scope
            $scope.userName = $window.localStorage.getItem('last_name');

            // console.log('success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/home');
          } else {
            console.log('failure: ', response);
            $scope.message = "Wrong!!";
          }
        });
      }
    };

    $scope.registerUser = function() {
      if($scope.user.username === '' || $scope.user.password === ''
      || $scope.user.email === '' || $scope.user.first_name === '' || $scope.user.last_name === '') {
        $scope.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/register', $scope.user).then(function(response) {
          console.log('success');
          $location.path('/login');
        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again.";
        });
      }
    };

    $scope.logout = function() {
      $http.get('/router/logout').then(function(response) {
        console.log('logged out');
        $location.path("/login");
      });
    };



}]);
