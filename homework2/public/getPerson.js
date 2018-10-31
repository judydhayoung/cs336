$(document).ready(function() {
  console.log("in getPerson.js"); //console test

  $( 'form' ).submit(function( event ) {
    event.preventDefault();

      // var form = $( this );
      // var array = form.serializeArray();
      // var id = array[0].value;

      var id = $("#loginID").val()
      var requestUrl = 'http://localhost:3000/person/' + id;

    $.ajax({
      type: 'GET',
      url: requestUrl,
      dataType: 'json',
      success: function (res) { console.log(res); }
    })
    .done(function( result) {
      // $({html: JSON.stringify( result )}).appendTo("#getPerson");
      $('#getPerson').append(result.firstName + ' ' + result.lastName + ' ' + result.startDate + ' ' +  result.loginID );
      })
    .fail(function( xhr, status, errorThrown ) {
      res.send('we cannot process page ' + req.url);
      res.sendStatus(503);
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    })
    });
  });
