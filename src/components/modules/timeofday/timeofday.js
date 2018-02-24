'use strict';
const serverFetcher = require('../../../serverFetcher');
const info = require('./timeOfDayInfo');


function getInfos(req, res) {
  const data = info.get();
  const opts = {
    method: 'GET'
  };
  //console.log(data);
  const giphyUrl = 'https://api.giphy.com/v1/gifs/search?api_key=NE1oJoC7rIPJSEjIW13oeAtNA3XUT13F&limit=300&offset=0&rating=G&lang=en&q=' + data.tag;
  serverFetcher.fetchJson(giphyUrl)
  .then(function(body) {
    const item = body.data[Math.floor(Math.random() * body.data.length)];
    //console.log(item);
    console.log(item.images.original.url);
    res.json({
      imageUrl : item.images.original.url,
      text : data.text,
      emoji : data.emoji,
  });
  });
}

module.exports =  {
  fetch : getInfos
}
