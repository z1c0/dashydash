'use strict';
const serverFetcher = require('../../../serverFetcher');
const info = require('./timeOfDayInfo');


function getInfos(req, res) {
  const data = info.get();
  const opts = {
    method: 'GET'
  };
  const giphyUrl = 'https://api.giphy.com/v1/gifs/random?api_key=NE1oJoC7rIPJSEjIW13oeAtNA3XUT13F&rating=PG&tag=' + data.tag;
  serverFetcher.fetchJson(giphyUrl)
  .then(function(body) {
    res.json({
      imageUrl : body.data.images.original.url,
      text : data.text,
      emoji : data.emoji,
  });
  });
}

module.exports =  {
  fetch : getInfos
}
