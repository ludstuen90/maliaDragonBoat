
DRGNBT.controller('surveyController', [ '$scope', '$http',
function ( $scope, $http ) {
  // sessionStorage.setItem("attending", attendingStatus );

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
        // events_id: sessionStorage.getItem("eventId")
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
        just_me: $scope.justMe,
        me_and_non_paddlers: $scope.meAndNonPaddlers,
        num_non_paddlers: $scope.numNonPaddlers,
        me_and_one_paddler: $scope.meAndOnePaddler,
        me_and_paddlers: $scope.meAndPaddlers,
        notes_survey_room: $scope.notes_other_accommodation,
        // room_preference:
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


          //
          // // console.log(responseOtherAccommodation);
          //
          //   $http({
          //     method: 'POST',
          //     url: '/otherAccommodation',
          //     data: responseHotel
          //   }); // end http
          // }; //end responseNo function


  //     if ( attendingStatus == 'maybe' )
  //     {
  //       console.log( 'MAYBE' );
  //       responseMaybe = {
  //           attend_status: "maybe",
  //           events_id: sessionStorage.getItem("eventId")
  //         }; // end object
  //
  //         // console.log("I am not going ", responseNo );
  //
  //         // Thank you response
  //         // location.href = '/#/thanksResponse';
  //
  //         // $http({
  //         //   method: 'POST',
  //         //   url: '/responseNo',
  //         //   data: responseNo
  //         // }); // end http
  //       }
  //       else if ( attendingStatus == 'yes' )
  //       {
  //         console.log( 'YES' );
  //         responseYes = {
  //             attend_status: "yes",
  //             events_id: sessionStorage.getItem("eventId")
  //           }; // end object
  //
  //           // console.log("I am not going ", responseNo );
  //
  //           // Thank you response
  //           // location.href = '/#/thanksResponse';
  //
  //           // $http({
  //           //   method: 'POST',
  //           //   url: '/responseNo',
  //           //   data: responseNo
  //           // }); // end http
  //         }
  // }; //end responseNo function

//--------------------------------------------------------------------------------






// // response is YES to attending
//   $scope.response = function() {
//         console.log("button");
//
          // location.href = '/#/surveyStep2';
//
//           // user has said YES to attending, therefore we direct them to step 2 for more questions
//
//           // attend_status= "yes";
//           //
//           // $scope.attendStatus.push(attend_status);
//
//         }; // End of responseYes function
//
// // response is YES and having OTHER ACCOMMODATION


//
// // response is YES and wants HOTEL
//   $scope.responseHotel = function() {
//         console.log("button");
//
//           // user has said YES to attending, therefore we direct them to step 3 for final questions regarding HOTEL
//           location.href = '/#/surveyStep3';
//         };
//
//     responseYes = {
//       attend_status: "yes",
//       events_id: sessionStorage.getItem("eventId")
//     };
//
 // }]); // End of survey controller
