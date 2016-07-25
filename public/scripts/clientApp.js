var DRGNBT = angular.module('DRGNBT', ['ngRoute']);

// Configure routes

DRGNBT.config(['$routeProvider', function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/login', {
      templateUrl: '/views/login.html',
      controller: "loginController"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "loginController"
    })
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "homeController"
    })
    // Route for the adminSurvey page
    .when('/adminSurvey', {
      templateUrl : 'views/adminSurvey.html',
      controller  : 'adminController'
    })
    // Route for the creatEvent page
    .when('/createEvent', {
      templateUrl : 'views/createEvent.html',
      controller  : 'adminController'
    })
    // Route for the hotelBlockBuilder page
    .when('/hotelBlockBuilder', {
      templateUrl : 'views/hotelBlockBuilder.html',
      controller  : ''
    })
    // Route for the hotelSelect page
    .when('/hotelSelect', {
      templateUrl : 'views/hotelSelect.html',
      controller  : 'adminController'
    })
    // Route for the noHotel page
    .when('/noHotel', {
      templateUrl : 'views/noHotel.html',
      controller  : ''
    })
    // Route for the roomAssignment page
    .when('/roomAssignment', {
      templateUrl : 'views/roomAssignment.html',
      controller  : ''
    })
    // Route for the surveyStep1 page
    .when('/surveyStep1', {
      templateUrl : 'views/surveyStep1.html',
      controller  : 'surveyController'
    })
    // Route for the surveyStep2 page
    .when('/surveyStep2', {
      templateUrl : 'views/surveyStep2.html',
      controller  : 'surveyController'
    })  // Route for the surveyStep3 page
      .when('/surveyStep3', {
        templateUrl : 'views/surveyStep3.html',
        controller  : ''
      })
      // Route for the thanksResponse page
      .when('/thanksResponse', {
        templateUrl : 'views/thanksResponse.html',
        controller  : ''
      })
    .when('/other', {
      templateUrl: '/views/other.html',
      controller: "OtherController"
    })
    .when('/viewEvent', {
      templateUrl : 'views/viewEvent.html',
      controller : 'viewEvent'
    })
    .otherwise({
      redirectTo: 'login'
    });
}]); // End of Routes
