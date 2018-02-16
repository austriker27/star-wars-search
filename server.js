'use strict';

const EXPRESS = require('express');
const PARSER = require('body-parser');

const APP = EXPRESS();
const API_URL = (`http://swapi.co/api/people/`)
const PORT = process.env.PORT || 3000;

APP.use(PARSER.json());
APP.use(PARSER.urlencoded({ extended: true }));
APP.use(EXPRESS.static('./public'));

APP.get('*', function(request, response){
  response.sendFile('index.html', {root: './public'})
});

APP.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});