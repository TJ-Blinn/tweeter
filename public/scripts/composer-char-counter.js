// document var exists in browser AND in HTML file that is calling it.
/* eslint-disable no-undef */

$(document).ready(function() {

  $("#tweet-text").on('input', function() {
    //console.log(event.target.value);
    console.log("Input Event has fired!");

    const maxLength = 140;
    const currentLength = $(this).val().length;
    const charRemaining = maxLength - currentLength;
    
    // CSS Selector identifying (DOM Element) counter number in webpage |
    $("output.counter").html(charRemaining);

    if (charRemaining < 0) {
      $("output.counter").addClass("redCounter");
    } else {
      $("output.counter").removeClass("redCounter");
    }

  });
});
