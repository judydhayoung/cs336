$( document ).ready(function() {
    $("button, input, a").click(function(e){
      e.preventDefault();
      // $("<em>").html(json.content, " ", result.name).appendTo("body");
      $.ajax({
          url: "/hello",
          data: {
              name: "lab7"
          },
          type: "POST",
          dataType : "json"
        })

        // place the returned text into the message as shown on the right (e.g., by using result.name).
        .done(function( result) {
          $("<em>", {html: result.html + result.name + "!" }).appendTo("body");
          window.history.pushState("Details", "Title", "/hello");
    })
        .fail(function( xhr, status, errorThrown ) {
          res.send('we cannot process page ' + req.url);
          res.sendStatus(503);
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
        })
        // event.stopPropagation();
    });
});
