'use strict';

//-------------------------------------------------------------
// function to send query data to SWAPI
//-------------------------------------------------------------

$('#search-form').submit((event) => {
  event.preventDefault();

  let $searchValueElement = $('.searchValue');
  let searchValue = $searchValueElement.val().trim().toString();
  let apiUrl = `https://swapi.co/api/people/?search=${searchValue}`;

  $('.characterList').text('');

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
      let counter = 0, femaleCount = 0, maleCount = 0, otherCount = 0;

      let renderSearchResults = (response) => {
        
   
        //  loop over the response
        response.results.forEach(function(response) {
          counter++;

          // count the gender results
          if(`${response.gender}` === 'female')
            femaleCount++;
          else if(`${response.gender}` === 'male')
            maleCount++;
          else
            otherCount++;
          
          // render the search results to the DOM
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

          // hide hair and eye color if not applicable
          if( `${response.hair_color}` === 'N/A hair'){
            $('.characterHairColor').hide();
          }
          if( `${response.eye_color}` === 'N/A eyes'){
            $('.characterEyeColor').hide();
          }
        });

        // counts total results from all genders
        let totalResults = parseInt(`${otherCount}`) + parseInt(`${maleCount}`) +  parseInt(`${femaleCount}`);

        // appends to the DOM - grammatically correct
        if(totalResults === 1 ){
          $('.results').text(`${totalResults} result`);
          console.log('here');
        } else {
          $('.results').text(`${totalResults} results`);
        }

        // adds totals to the filter tab for each gender
        $('#femaleFilter').text(`Female (${femaleCount})`);
        $('#maleFilter').text(`Male (${maleCount})`);
        $('#otherFilter').text(`Other (${otherCount})`);

        // change the results box div so it only takes up the same space as the character results & change background color
        $('.resultsBox').css('height', '100%');
        $('.resultsBox').css('background-color', '#F7F8FA');
        $('.resultsBox').css('box-shadow', 'none');
        // $('.resultsBox').css('background-color', '#F7F8FA');


        // box-shadow: 0px 1px 3px #E1E2E6;
        // box-shadow: 0px 4px 14px #E1E2E6;

      };
      renderSearchResults(response);
    },
    
    error: () => {
      $('#search-form').html('<p class="error">Uh oh, no results found. Try that again soon. </p>');
    },

  });
});

//-------------------------------------------------------------
// FUNCTION FOR GENDER FILTER
//-------------------------------------------------------------

$('.genderFilterTarget').change(function() {

  $('.characterLi').show();
  let selectedGender = $(this).val();

  if(selectedGender === 'other') {
    $('.characterLi')
      .filter( function() {
        return(this.className === 'characterLi male' || this.className === 'characterLi female');
      })
      .hide();

  } else {
    $('.characterLi')
      .filter( function() {
        return(this.className !== 'characterLi ' + selectedGender);
      })
      .hide();
  }
});
