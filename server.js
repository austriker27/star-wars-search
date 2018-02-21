'use strict';

const express = require('express');
const parser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const Request = require('request');
// const cors = require('cors');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static('./public'));
// app.use(cors());

const API_URL = (`http://swapi.co/api/people/`);


let query = 'luke';

let options = { 
  method: 'GET',
  url: API_URL,
  mode: 'cors',
  headers: {
    'Access-Control-Allow-Origin': 'swapi.com',
  },
  qs: { 
    search: `${query}`,
  },
};

// david - trying below in the post request
// request(options, (error, response, body) => {
//   if (error) 
//     throw new Error(error);
//   else {
//     let characterResult = JSON.parse(body);
//     let characterResultName = JSON.parse(body).results[0].name
//     let characterResultGender = JSON.parse(body).results[0].gender
//     let characterResultHairColor = JSON.parse(body).results[0].hair_color
//     let characterResultEyeColor = JSON.parse(body).results[0].eye_color
//   }
// });

app.post('/', (request, response) => {
  let character = request.body.character;

  Request(options, (error, _, body) => {
    if (error) 
      throw new Error(error);
    else {
      let characterResult = JSON.parse(body);
      let characterResultName = characterResult.results[0].name;
      let characterResultGender = characterResult.results[0].gender;
      let characterResultHairColor = characterResult.results[0].hair_color;
      let characterResultEyeColor = characterResult.results[0].eye_color;
      // if(characterResult.main === undefined){
      //   _.render('index', {character: null, error: 'Try again.'});
      // } else {
      //   let characterText = `Name: ${characterResultName}`;
      //   _.render('index', {characterResult: characterText, error: null});
      // }
      console.log(characterResult);
    }
  });
});


app.get('/', (request, response) => {
  response.sendFile('index.html', {root: './public'});
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});