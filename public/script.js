'use strict';



//-------------------------------------------------------------
// function to send query data to SWAPI
//-------------------------------------------------------------

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
      $('.searchLandingText')
        .empty()
        .append('<div id="loading"><img src="/images/loading.png" alt="loading image" /> </div>');
    },

    success: (response) => {
      $('#searchValue').empty();
      $('#loading').remove();

      let renderSearchResults = (response) => {
        let counter = 0;
        // for loop over the response and render them to the table div
        response.results.forEach(function(response) {
          counter++;
          $('.characterList')
            .append(
              `<li class='characterLi ${response.gender}'>
                <p class='characterName'>${response.name} </p> 
                <div class='characterSubtitles'>
                  <span class='characterGender ${response.gender}'>${response.gender}</span> <span> • </span> 
                  <span class='characterHairColor ${response.hair_color}'>${response.hair_color} </span> <span class="${response.hair_color}"> hair • </span>
                  <span class='characterEyeColor ${response.eye_color}'>${response.eye_color} </span> <span> eyes </span>
                </div>
              </li>`);
        });

        if(`${counter}` === 1 ){
          $('.results').text(`${counter} result`);
        } else if (`${counter}` > 1) {
          $('.results').text(`${counter} results`);
        } else {
          $('.results').text(`0 results`);
        }
        
        
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

//-------------------------------------------------------------
// FUNCTION FOR GENDER FILTER
//-------------------------------------------------------------

// $('#femaleFilter').change = () => {
//   $('.characterList').forEach = () => {
//     if(!this.className.includes('female')){
//       $('.characterList').toggleClass('hide');
//       // .selectmenu('refresh', true);
//     }
//   };
// };

$('.genderFilterTarget').change(function() {
  $('.characterLi').filter('.male').toggleClass('hide');
});

// when female filter is selected show all characterLi that contain a class of female