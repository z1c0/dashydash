'use strict';
const serverFetcher = require('../../../serverFetcher');
const notifications = require('../../common/notifications');


function getRecipe(req, res) {
  // query can be empty
  serverFetcher.fetchJson('https://api.chefkoch.de/v2/recipes?descendCategories=1&order=0&minimumRating=3&maximumTime=0&query=vegetarisch&limit=1&orderBy=7&hasImage=1')
  .then(function(all) {
    const id = all.results[Math.floor(Math.random() * all.results.length)].recipe.id;
    //console.log(id);
    serverFetcher.fetchJson('https://api.chefkoch.de/v2/aggregations/recipe/screen/' + id)
    .then(function(r) {
      //console.log(r);
      const imageId = r.recipe.previewImageId;
      res.json({
        title : r.recipe.title,
        text : r.recipe.subtitle,
        image : 'http://api.chefkoch.de/v2/recipes/' + r.recipe.id + '/images/' + imageId + '/crop-420x280',
        url : r.recipe.siteUrl
      });
    });
  });
}

function sendRecipe(req, res) {
  notifications.sendNotification(req.body, 'lets_cook');
  res.json({
    status : 'OK'
  });
}

module.exports =  {
  fetch : getRecipe,
  post : sendRecipe
}
