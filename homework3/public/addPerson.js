$(document).ready(function() {
  console.log("in addPerson.js");
  $.getJSON('people.json', function(data){
    $.each(data, function(i, user){
      $('#people').append('<li>'+user.firstName+ ' ' + user.lastName + '</li>');
    });
  });

  $( 'form' ).submit(function( event ) {
    event.preventDefault();
    var form = $(this);
    //test
    console.log("form", form);
    console.log('form.serializeArray()', form.serializeArray());
    console.log('this.firstName.val', this.firstName.val);

    var fname = $("#firstName").val();
    var lname = $("#lastName").val();
    var loginid = $("#loginID").val();
    var startdate = $("#startDate").val();

    var newPerson = {
      firstName: fname,
      lastName: lname,
      loginID: loginid,
      startDate: startdate
    }
    $("#newPerson").html("Added new person: " + fname + " " + lname + " " + loginid + " " + startdate);

    console.log("form serialized", form.serialize());
    $.ajax ({
        url: '/people',
        type: 'POST',
        data: form.serialize(),
        dataType: 'json'
      });

  });
});
