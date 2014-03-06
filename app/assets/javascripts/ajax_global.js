$(document).ready(function(){
  // Ajax Global Functions

  // Fires at beginning of Ajax Request
  $(document).ajaxStart(function(){
    $("#ajaxSpinnerImage").show();
  }).ajaxStop(function(){
      // Fires when Ajax Request is done
      $("#ajaxSpinnerImage").hide();
    })
  .ajaxError(function( event, request, settings ) {
    $( "#msg" ).append( "<li>Error requesting page " + settings.url + "</li>" );
  });

});
