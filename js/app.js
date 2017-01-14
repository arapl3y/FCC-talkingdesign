var app = {};

app.init = function() {
  app.url = "//quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=";
  $(window).on('load', app.loader);
  app.getQuote();
  app.nextQuote();
};

app.loader = function() {
  setTimeout(app.showPage, 2000);
};

app.showPage = function() {
  $('.loader').css('display', 'none');
  $('#quoteDiv').css('display', 'block');
};

app.getQuote = function() {
  $('#status').show();
  $.ajax({
    url: app.url,
    success: function(data) {
      $('#status').fadeOut();
      var post = data.shift(); // The data is an array of posts. Grab the first one.
      $('#quoteAuthor').text(post.title).hide().fadeIn();
      $('#quoteContent').html(post.content).hide().fadeIn();
      app.postAuthor = post.title;
      app.postContent = $('#quoteContent').html(post.content).text();
    },
    cache: false
  });
};

app.nextQuote = function() {
  $('#nextQuote').on('click', app.getQuote);
};

$("#tweet").on("click", function() {
  window.open("//twitter.com/intent/tweet?text=" + app.postContent + " - " + app.postAuthor);
});

$(document).ready(app.init);
