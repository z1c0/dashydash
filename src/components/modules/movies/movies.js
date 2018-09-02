'use strict';
const cron = require('cron');
const moment = require('moment');
const request = require('request');
const db = require('../../common/db');
const secrets = require('../../../secrets.json');
const notifications = require('../../common/notifications');


String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

function updateDb(movies) {
  let table = db.get('movies');
  movies.forEach(function (m) {
    table.find({ title: m.title }, function (err, docs) {
      if (docs.length == 0) {
        //console.log(m);
        // not found -> insert into db
        var doc = {
          title: m.title,
          at: new Date(),
        };
        table.insert(doc);

        notifications.sendNotification(m);
      }
    });
  }, this);
}

function canonicalizeTitle(title) {
  let newTitle = '';
  if (title.startsWith('OV') && !title.includes('Sneak Preview')) {
    newTitle = title.replace('OV ', '');
    newTitle = newTitle.replace('IMAX', '');
    newTitle = newTitle.replace('ATMOS', '');
    newTitle = newTitle.replace('Dolby Atmos', '');
    newTitle = newTitle.replace('3D', '');
    newTitle = newTitle.trim();
  }
  return newTitle;
}

function checkMovies() {
  let movies = [];

  request.get({
    url : secrets.movieUrl,
    json : true
  },
  function(err, httpResponse, body) {
    if (err) {
      notifications.sendError(err);
    }
    else if (body.Error) {
      notifications.sendError(body.Error);
    }
    else {
      var movieMap = [];
      if (body.Filme) {
        body.Filme.forEach(function (f) {
          var title = canonicalizeTitle(f.Anzeigetitel);
          if (title) {
            movieMap[title] = {
              title: title,
              image: f.Bild,
              start: moment(f.Filmstart).format('MMMM Do'),
              url: 'http://www.megaplex.at/film/' + title.replaceAll(' ', '-')
            };
          }
        });
      }
      // create array from map.
      for (var key in movieMap) {
        movies.push(movieMap[key]);
      }
      //console.log(movies);
      updateDb(movies);
    }
  });
}

module.exports = {
  init: function () {
    if (secrets.iftttkey) {
      const cronJob = cron.job("0 0 */1 * * *", () => {
        checkMovies();
      });
      cronJob.start();
      checkMovies();
    }
  }
}
