$( document ).ready(function() {
    $( "a" ).click(function( event ) {
        alert( "The link will no longer take you to jquery.com" );
        event.preventDefault();
    });
    $( "a" ).addClass( "test" );
    $( "a" ).removeClass( "test" );
    $( "a" ).click(function( event ) {
      event.preventDefault();
      $( this ).hide( "slow" );
    });

    $('button').click(function(){
        $("<em>", {html: "no data yet..."}).appendTo("body");
        event.stopPropagation(); // <<<<<<<<
    });


});
