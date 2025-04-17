'use strict';
const serverFetcher = require('../../../serverFetcher');
const notifications = require('../../common/notifications');


function getQuote(req, res) {
  // query can be empty
  serverFetcher.fetchJson('http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote')
  .then(function(quote) {
    //console.log(quote);
    let text = quote.starWarsQuote;
    let author = 'Star Wars';
    const parts = text.split('—');
    if (parts.length == 2) {
      text = parts[0].trim();
      author = parts[1].trim();
    }
    const giphyUrl = 'https://api.giphy.com/v1/gifs/random?api_key=NE1oJoC7rIPJSEjIW13oeAtNA3XUT13F&rating=PG&tag=' + author;
    serverFetcher.fetchJson(giphyUrl)
    .then(function(giphy) {
      //console.log(giphy);
      res.json({
        image : giphy.data.images.original.url,
        text : text,
        author : author,
      });
    });
  });
}

module.exports =  {
  fetch : getQuote
}