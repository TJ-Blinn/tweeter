/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    // calls createTweetElement for each tweet, takes return value and prepends it to the tweets container
  
    const $container = $('.tweets-container');
    $container.empty();
  
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

  // escape function to prevent XSS attack
  const createTweetElement = (tweetData) => {
    
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const safeHTML = `<p>${escape(tweetData.content.text)}</p>`;
    

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
    
    $('.form-validation').slideUp();

    if (serializedData.length > 140) {
      $('.form-validation').text("🛑 Your tweet is over the 140 character limit!").addClass('red-counter warning').slideDown(500);
      $(".form-validation").removeClass("error");
      return;
    } else if (serializedData.length === 0) {
      $('.form-validation').text("⚠️ Your tweet is empty. In order to submit, please enter a minimum of 1 character").addClass('error').slideDown(500);
      $(".form-validation").removeClass("red-counter warning");
      return;
    }

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

    // counter reset to 140 characters
    $(".counter").val("140");
    
  });


});