
DRGNBT.controller('surveyController', [ '$scope', '$http',
function ( $scope, $http ) {

  $scope.responseYes = function() { // pulls event info and sends to database
        console.log("button");

          location.href = '/#/surveyStep2'; // Send to step 2 in survey process

        };

  $scope.responseNo = function() { // pulls event info and sends to database

    responseNo = {  // package inputs into object to send
        first_name: $scope.firstName,
        last_name: $scope.lastName,
        attendStatus: "no"
      }; // end object

      console.log("I am not going ", responseNo );

      $http({  // sends object via POST to create event in database
        method: 'POST',
        url: '/responseNo',
        data: responseNo
      }); // end http

    }; //end createSurvey function

 }]); // End of survey controller
