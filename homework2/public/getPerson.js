$(document).ready(function() {
  console.log("in addPerson.js"); //console test
  $.getJSON('people.json', function(data){
    $.each(data, function(i, user){
      $('#people').append('<li>'+user.firstName+ ' ' + user.lastName + '</li>');
      if ()
    });

  for (const person of data) {
    if (person['loginID'] == req.params.id)
    // if (peopleData.loginID == req.params.id)
      res.json(person);
}

  var fname = $("#firstName").val();
  var lname = $("#lastName").val();
  var loginid = $("#loginID").val();
  var startdate = $("#startDate").val();
  console.log("New person: " + fname + " " + lname + " " + loginid + " " + startdate);
  $("#newPerson").html(fname + " " + lname + " " + loginid + " " + startdate);

  $( 'form' ).submit(function( event ) {
    event.preventDefault();

    var form = $( this );

    $.ajax({
      type: 'POST',
      url: '/people',
      data: form.serialize(),
      dataType: 'json'
    }).done(function( result) {
      $("<em>", {html: result.firstName + result.lastName + result.startDate + result.loginID + "Added" }).appendTo("#people");
        console.log( result );
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
