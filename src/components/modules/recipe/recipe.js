'use strict';
var serverFetcher = require('../../../serverFetcher');

function getRecipe(req, res) {
  serverFetcher.fetchJson('http://api.chefkoch.de/api/1.1/api-recipe-search.php?Suchbegriff=vegetarisch&i=0&z=1&m=0&o=0&t=&limit=1000')
  .then(function(all) {
    const id = all.result[Math.floor(Math.random() * all.result.length)].RezeptShowID;;
    //console.log(id);
    serverFetcher.fetchJson('http://api.chefkoch.de/api/1.0/api-recipe.php?ID=' + id)
    .then(function(r) {
      r = r.result[0];
      //console.log(r);
      res.json({
        title : r.rezept_name,
        text : r.rezept_name2,
        image : r.rezept_bilder[0].big.file
      });
    });
  });
}

module.exports =  {
  fetch : getRecipe
}
