
DRGNBT.controller('surveyController', [ '$scope', '$http',
function ( $scope, $http ) {
  // sessionStorage.setItem("attending", attendingStatus );
  // $scope.title1 = 'Button';



// response is NO to attending ---------------------------------------------------
  $scope.attendResponse = function( attendingStatus ) {

    console.log( "in attendResponse:", attendingStatus );
    sessionStorage.setItem("attending", attendingStatus );
    console.log( 'sessionStorage attending:', sessionStorage.getItem("attending") );

    if( attendingStatus == 'no' )
    {
      console.log( 'NO' );
        responseNo = {
          attend_status: attendingStatus,
          events_id: sessionStorage.getItem("eventId")
          // events_id: sessionStorage.getItem("eventId")
        }; // end object

        console.log("I am not going ", responseNo );

        // Thank you response
        location.href = '/#/thanksResponse';

        $http({
          method: 'POST',
          url: '/responseNo',
          data: responseNo
        }); // end http
      }
      else {
        location.href = '/#/surveyStep2';
      }
    };

// response is OTHER ACOOMMODATION, send to otherAccommodation.html
    $scope.responseOtherAccommodation = function(){
      // console.log(sessionStorage.getItem("attending"));
      location.href = '/#/otherAccommodation';
    };

// response is OTHER ACOOMMODATION, now it is time to gather notes and send our data to the DB
  $scope.otherAccommodationNotes = function() {
    console.log("notes button pushed");

    responseOtherAccommodation = {
        attend_status: sessionStorage.getItem("attending"),
        hotel_status: "no",
        notes_other_accommodation: $scope.notes_other_accommodation,
        events_id: sessionStorage.getItem("eventId")
      }; // end object

    // Thank you response
    location.href = '/#/thanksResponse';

    // console.log(responseOtherAccommodation);

      $http({
        method: 'POST',
        url: '/otherAccommodation',
        data: responseOtherAccommodation
      }); // end http
    }; //end responseNo function

// response is HOTEL, send to surveyStep3.html
  $scope.responseHotel = function(){
    location.href = '/#/surveyStep3';
  };

// response is HOTEL, now it is time to gather hotel details and send our data to the DB
  $scope.submitHotel = function() {
    console.log("Hotel button pushed");

    responseHotel = {
        attend_status: sessionStorage.getItem("attending"),
        hotel_status: "yes",
        roommate_option: $scope.roommateOption,
        num_non_paddlers: $scope.number,
        notes_survey_room: $scope.notes_survey_room,
        events_id: sessionStorage.getItem("eventId")

        // events_id: sessionStorage.getItem("eventId")
      }; // end object

      console.log(responseHotel);

      // Thank you response
      location.href = '/#/thanksResponse';

      $http({
        method: 'POST',
        url: '/hotel',
        data: responseHotel
      }); // end http
    }; //end responseNo function
}]); // End of survey controller
