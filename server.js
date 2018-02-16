'use strict';

const EXPRESS = require('express');
const PARSER = require('body-parser');

const APP = EXPRESS();
const PORT = process.env.PORT || 3000;
const request = require('request');

APP.use(PARSER.json());
APP.use(PARSER.urlencoded({ extended: true }));
APP.use(EXPRESS.static('./public'));

const API_URL = (`http://swapi.co/api/people/`)


APP.get('API/search', searchCharacters);

let searchCharacters = (request, response) => {
}

let options = { 
  method: 'GET',
  url: API_URL,
  qs: { 
    search: '${searchString}'
  },
  };

request(options, (error, response, body) => {
  if (error) throw new Error(error);

  console.log('body:', body);
});




// APP.get('*', (request, response) => {
//   response.sendFile('index.html', {root: './public'})
// });

// APP.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`)
// });