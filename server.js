'use strict';

const express = require('express');
const parser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const request = require('request');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static('./public'));

const API_URL = (`http://swapi.co/api/people/`)


let query = 'luke';

let options = { 
  method: 'GET',
  url: API_URL,
  qs: { 
    search: `${query}`
  },
};


request(options, (error, response, body) => {
  if (error) 
    throw new Error(error);
  else {
    let characterResult = JSON.parse(body);
    let characterResultName = JSON.parse(body).results[0].name
    let characterResultGender = JSON.parse(body).results[0].gender
    let characterResultHairColor = JSON.parse(body).results[0].hair_color
    let characterResultEyeColor = JSON.parse(body).results[0].eye_color
  }
});




app.get('/', (request, response) => {
  response.sendFile('index.html', {root: './public'})
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});