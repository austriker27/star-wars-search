'use strict';

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/', (request, response) => {
  response.sendFile('index.html', {root: './public'});
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});