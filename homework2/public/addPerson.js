$(document).ready(function() {
  console.log("in addPerson.js");
  $.getJSON('people.json', function(data){
    $.each(data, function(i, user){
      $('#people').append('<li>'+user.firstName+ ' ' + user.lastName + '</li>');
    });
  });

  $( 'form' ).submit(function( event ) {
    event.preventDefault();

    var form = $( this );
    var ser = form.serialize();
    console.log(ser);

    //send data to server to be added to in memory database

    $.ajax({
      type: 'POST',
      url: '/people',
      data: form.serialize(),
      dataType: 'json',
      success: function( result ) {
        console.log(data);
        console.log(result, "result");
        console.log(result.firstName, "fname");
         $("#newPerson").html(result.firstName + result.lastName + result.startDate + result.loginID);
          $({html: result.firstName + result.lastName + result.startDate + result.loginID + "Added"}).appendTo("#newPerson");

      // $("<em>", {html: result.firstName + result.lastName + result.startDate + result.loginID + "Added" }).appendTo("#people");
      //   peopleData.push({html: result.firstName, html: result.lastName, html: result.startDate, html: result.loginID});
      //   console.log( result );


        console.log("New person: " + fname + " " + lname + " " + loginid + " " + startdate);
      }
    });

  });
});
      // .fail(function( xhr, status, errorThrown ) {
      //   // res.send('we cannot process page ' + req.url);
      //   // res.sendStatus(503);
      //   console.log( "Error: " + errorThrown );
      //   console.log( "Status: " + status );
      //   console.dir( xhr );
      // })
