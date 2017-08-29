'use strict';
var serverFetcher = require('../../../serverFetcher');

function getRecipe(req, res) {
  serverFetcher.fetchJson('http://api.chefkoch.de/api/1.1/api-recipe-search.php?Suchbegriff=vegetarisch&i=0&z=1&m=0&o=0&t=&limit=1000')
  .then(function(result) {
    var r = result.result[Math.floor(Math.random() * result.result.length)];
    res.json({
      title : r.RezeptName,
      text : r.RezeptName2,
      image : r.RezeptBild
    });
  });
}

module.exports =  {
  fetch : getRecipe
}
