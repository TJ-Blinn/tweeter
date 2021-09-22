/* eslint-disable no-undef */

$(document).ready(function() {

  $("#tweet-text").on('input', function() {
    //console.log("Input Event has fired!");

    const maxLength = 140;
    const currentLength = $(this).val().length;
    const charRemaining = maxLength - currentLength;
    
    // CSS Selector identifying (DOM Element) counter number in webpage |
    $("output.counter").html(charRemaining);

    if (charRemaining < 0) {
      $("output.counter").addClass("red-counter");
    } else {
      $("output.counter").removeClass("red-counter");
    }

  });
});
