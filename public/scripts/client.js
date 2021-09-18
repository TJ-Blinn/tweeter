/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  
    const $container = $('.tweets-container');
    $container.empty(); // tweets container is emptying out previous hard-coded tweets
  
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet); // tweet here is an individual tweet from the data array
      $container.prepend($tweet);
    }
  };

  // Get request with AJAX // fetching tweets from the http://localhost:8080/tweets page
  const loadTweets = () => {
    $.ajax('/tweets', {
      method: "GET",
      dataType: "json"
    }).then(function(tweetsJSON) {
      renderTweets(tweetsJSON);
    });

  };
  // fetching tweets on page load
  loadTweets();

  const createTweetElement = (tweetData) => {

    // escape function to prevent XSS attack
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const safeHTML = `<p>${escape(tweetData.content.text)}</p>`;
    //<p>${escape(tweetData.content.text)}</p>

    let $tweet = $(`
  <article>
          <header>
          <img src="${tweetData.user.avatars}">
            <h3>${tweetData.user.name}</h3><span class="handle">${tweetData.user.handle}</span>
          </header>
          <main>
            <p>${safeHTML}</p>
          </main>

          <footer>
            <div>
              <span class="timestamp">${timeago.format(tweetData.created_at)}</span>
              <div class="footer_icons">
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>
            </div>

          </footer>
        </article>
  `);
    return $tweet;
  };

  // Event handler AJAX .submit
  $("#tweetForm").on("submit", function(event) {
    event.preventDefault(); // prevent the default form submission behaviour
    
    const serializedData = $("textarea").val();
    
    if (serializedData.length > 140) {
      $('.form-validation').slideUp();
      $('.form-validation').text("Your tweet is over the 140 character limit!").addClass('.redCounter').slideDown(500);
      //alert("Your tweet is over the 140 character limit!");
      return;
    }

    if (serializedData.length === 0) {
      $('.form-validation').slideUp();
      $('.form-validation').text("Your tweet is empty. In order to submit, please enter a minimum of 1 character").slideDown(500);
      // $('#error').show();
      //alert("Your tweet is empty. In order to submit, please enter a minimum of 1 character");
      return;
    }

    $('.form-validation').slideUp();


    // POST a new tweet - AJAX is adding serialized data
    $.ajax('/tweets/', {
      method: "POST",
      data: {text: serializedData}
    })
      .then((resp) => {
        //$(".counter").val(140);
        loadTweets();
        $('textarea').val(undefined);
      });

    // hide error message alerts
    // $('#warning').hide();
    // $('#error').hide();

    //$("#tweet-text").val("");
    $(".counter").val("140");
    
  });


});