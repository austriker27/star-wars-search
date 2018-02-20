'use strict';

// function to grab the data from the search bar and use it to send to the server


$('#search-form').submit((event) => {
  event.preventDefault();

  let $searchValueElement = $('.searchValue');
  let searchValue = $searchValueElement.val().trim().toString();
  console.log(searchValue);

  let apiUrl = `https://swapi.co/api/people/?search=${searchValue}`;

  $('.characterList').text('');

  console.log({apiUrl});
  console.log($searchValueElement);
  console.log(searchValue);

  $.ajax({
    url: `${apiUrl}`,
    type: 'GET',
    crossDomain: true,
    dataType: 'json',

    beforeSend: () => {
      $('#search-form')
        .append('<div id="Loading"><img src="/images/loading.png" alt="loading image" /> </div>');
    },

    success: (response) => {
      $('#searchValue').empty();
      $('#Loading').remove();

      let renderSearchResults = (response) => {
        let counter = 0;
        // for loop over the response and render them to the table div
        response.results.forEach(function(response) {
          counter++;
          $('.characterList')
            .append(`<li class=''>
              <p class='characterName'>${response.name} • </p> 
              <p class='characterGender ${response.gender}'>${response.gender} • </p>
              <p class='characterHairColor'>${response.hair_color} • </p>
              <p class='characterEyeColor'>${response.eye_color} • </p>
            </li>`);
        });
        $('.results').text(`${counter} results`);
        // if(response.next){
        // TODO : write function for results.next if multiple pages
        //   renderSearchResults(response.next);
        // }
      };
      renderSearchResults(response);

    },
    
    error: () => {
      $('#search-form').html('<p class="error">Uh oh, no results found. Try that again soon. </p>');
    },

  });

  // david - method using fetch rather than jQuery, but getting error back from SWAPI
  // link - https://blog.zingchart.com/2017/12/14/how-to-make-a-chart-using-fetch-rest-apis/
  // const fetchParams = {
  //   method: 'GET',
  //   mode: 'cors',
  // };

  // const API_URL = `https://swapi.co/api/people/?search=boba`;

  // fetch(API_URL, fetchParams)
  //   .then(response => {
  //     if(!res.ok) {
  //       throw new TypeError(response.statusText);
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     const character = data.results;
  //     console.log(character);
  //     $('.characterTable').append(character.name);
      
  //   })
  //   .catch(error => {
  //     console.log('error from SWAPI');
  //   });
});