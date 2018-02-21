## A Star Wars Character Search
This is a very tiny web app that allows you to search for your favorite, or least favorite, star wars character. It uses [SWAPI](https://swapi.co/) as an API endpoint for your query. It will return data from SWAPI for the character search. Data includes the characters name, gender, hair color and eye color. A user can search for a character with any letters and then filter results by gender. With the current implementation the app only returns the first 10 results from SWAPI.

## Deployment
This project uses continuous deployment via [Netlify](https://www.netlify.com/) to deploy from the `master` branch. Check it out [here](https://star-wars-search.netlify.com/).

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"  height="144"/>
</a>

## Tech/framework used
- jQuery
- Vanilla JavaScript
- CSS (from scratch)

<b>Built in</b>
- [VS Code](https://code.visualstudio.com/)

## API Endpoint
This app is using the following API endpoint at SWAPI, where `${searchValue}` is the user's search query. You can go to the link in your browser to look at the details. 
```
https://swapi.co/api/people/?search=${searchValue}
```

## API Reference
- SWAPI docs for people are [here](https://swapi.co/documentation#people).
- SWAPI docs for searching are [here](https://swapi.co/documentation#search). 


## Tests
At this time there are no tests. 

## How to use?

![A screencaptured gif of how to use this website](https://cl.ly/0g1C0I0T370Z/Screen%20Recording%202018-02-21%20at%2011.26%20AM.gif)

It is pretty easy to get off the ground with this website. 
1. Search for your favorite character
2. Peruse the results
3. Filter the results by gender if desired.
4. Search again to your heart's content!

## Future TODO
- Build out the ability for more than 10 results to come back from SWAPI (Pagination on SWAPI's end)
- Write tests!

## Contribute
Feel free to contribute! Just submit a PR and I'll take a look.

## Credits
Thanks to Soylent for powering me through this project. 

#### Anything else that seems useful

## License
MIT License is applicable here.

MIT © [David A. Lindahl](www.davidalindahl.com)