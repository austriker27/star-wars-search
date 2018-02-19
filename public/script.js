'use strict';

$.ajax({
  url: 'https://swapi.co/api/people/1',
  // data: {userId: '1'},
  type: 'GET',
  crossDomain: true,
  dataType: 'json',

  beforeSend: () => {
    // append loading image
    $('#search-form').html('<div class="Loading"><img src="/images/loading.gif" alt="loading image" /> </div>');
  },

  success: (response) => {
    // this is what you do with the data
    $('#search-form').empty();
    console.log(response);
    $('.characterTable').text(response.name);
  },

  error: () => {
    $('#search-form').html('<p class="error">Uh oh, no results found. Try that again soon. </p>');

  },
});