'use strict';

$.ajax({
  type: 'GET',
  url: 'https://swapi.co/api/people/',
  data: {userId: '1'},

  headers: {
    'Access-Control-Allow-Origin': '*',
  },

  beforeSend: () => {
    // append loading image
    $('#search-form').html('<div class="Loading"><img src="/images/loading.gif" alt="loading image" /> </div>');
  },

  success: (data) => {
    // this is what you do with the data
    $('search-form').empty();
    $(data).find('item').each(function(i){
      $('search-form').append('<h4>' + $(this).find('name').text() + '</h4><p>' + $(this).find('gender').text() + '</p>');
    });
  },
  error: () => {
    $('#search-form').html('<p class="error">Uh oh, no results found. Try that again soon. </p>');

  },
});