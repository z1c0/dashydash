'use strict';
var cron = require('cron');
var soap = require('soap');
var moment = require('moment');
var request = require('request');
var db = require('../../common/db');

const iftttkey = require('../../../secrets.json').iftttkey;
const megaplexWsdlUrl = "http://linz.megaplex.at/webservice/serviceext.asmx?wsdl";
const megaplexContentUrl = "http://www.megaplex.at/content/";


function getIftttUrl(eventName, iftttkey) {
  let url = 'https://maker.ifttt.com/trigger/' + eventName + '/with/key/' + iftttkey;
  //console.log(url);
  return url;
}

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

        request({
          url: getIftttUrl('new_movie', iftttkey),
          method: 'POST',
          json: {
            value1: m.title,
          }
        });
      }
    });
  }, this);
}

function canonicalizeTitle(title) {
  let newTitle = '';
  if (title.startsWith('OV') && !title.includes('Sneak Preview')) {
    newTitle = title.replace('OV ', '');
    newTitle = newTitle.replace('IMAX ', '');
    newTitle = newTitle.replace('ATMOS ', '');
    newTitle = newTitle.replace('3D', '');
    newTitle = newTitle.trim();
  }
  return newTitle;
}

function checkMovies() {
  let movies = [];
  var url = megaplexWsdlUrl;
  soap.createClient(url, function (err, client) {
    if (!err) {
      var from = moment().format('YYYY-MM-DD');
      var to = moment().add(2, 'w').format('YYYY-MM-DD');
      var args = { FromDate: from, ToDate: to, SQLFilter: '', SQLSort: '' };
      client.GetSchedule(args, function (err, result) {
        try {
          var movieMap = [];
          var details = result.GetScheduleResult.ScheduleDetails;
          details.forEach(function (d) {
            var title = canonicalizeTitle(d.FilmTitle);
            if (title) {
              //console.log(d);
              movieMap[title] = {
                title: title,
                image: megaplexContentUrl + d.FilmImg.split('/')[1],
                start: moment(d.FilmStart).format('MMMM Do'),
                url: 'http://www.megaplex.at/film/' + title.replace(' ', '-')
              };
            }
          }, this);
          // Create array from map.
          for (var key in movieMap) {
            movies.push(movieMap[key]);
          }
          //console.log(movies);
          updateDb(movies);
        }
        catch (e) {
          console.log(e);
        }
      });
    }
  });
}

module.exports = {
  init: function () {
    var cronJob = cron.job("0 0 */1 * * *", function () {
      checkMovies();
    });
    cronJob.start();
    checkMovies();
  },
}
