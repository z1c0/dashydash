'use strict';
var request = require('request');
var moment = require('moment');
var cheerio = require('cheerio');

// TODO: extract
function padHelper(string, maxLen, padChar, left) {
  if (!padChar) {
    padChar = ' ';
  }
  let pad = new Array(maxLen + 1 - string.length).join(padChar);
  return left ? (pad + string) : (string + pad);
}

String.prototype.padLeft = function(maxLen, padChar) {
  return padHelper(this, maxLen, padChar, true);
};

String.prototype.padRight = function(maxLen, padChar) {
  return padHelper(this, maxLen, padChar, false);
};



//const FROM = 'Gallneukirchen, Marktplatz';
//const TO = 'Linz, Hessenplatz';
const FROM = 'Gallneukirchen';
const TO = "Linz Altenberger Straße (B125)";
const URL = 'http://fahrplan.oebb.at/bin/query.exe/dn?start=1&S=' +
  encodeURIComponent(FROM) +'&Z=' + encodeURIComponent(TO) +
  '&timesel=depart&time='


function transform(body) {
  const $ = cheerio.load(body);
  let i = 0;
  let times = [];

  while (true)
  {
    let row = $('#trOverviewC0-' + i++);
    if (row.length === 0) {
      break;
    }

    let changes = row.find('.changes').text().trim();
    if (changes === '0') {  // only direct connections please
      let from = row.find('.station div').eq(0).text().trim();
      let to = row.find('.station div').eq(2).text().trim();
      let departs = row.find('.planed').eq(0).html().split('<br>')[0].trim().substr(0, 5);
      let arrives = row.find('.planed').eq(0).html().split('<br>')[1].trim().substr(0, 5);
      let duration = row.find('.duration').text().trim();
      let line = row.find('.product').first().attr('title').trim();
      let prefix = from.indexOf('Marktplatz') > 0 ? 'M' : 'A';
      let time = prefix + ':' + line.substr(4).padRight(4) + ' ' + departs + ' ' + duration;
      //console.log(from);
      times.push(time);
    }
  }
  return times;
}

function requestAsync(offset) {
  let time = moment().add(offset, 'minutes').format('HH:mm');
  let url = URL + time;
  return new Promise(function(resolve, reject) {
    request(
      url, 
      function(err, res, body) {
        if (err) {
          return reject(err);
        }
        return resolve(transform(body));
      });
  });
}

function fetch(req, res) {
  let requests = [ requestAsync(0) ];
  if (moment().hour() < 23) {
    // Careful when it gets close to midnight or we will get bus time for THIS day's early hours.
    requests.push(requestAsync(15));
    requests.push(requestAsync(30));
  }

  Promise.all(requests)
  .then(function(times) {
    // flatten
    times = [].concat.apply([], times);
    // remove duplicates
    times = times.filter(function(value, index) { return times.indexOf(value) === index })
    res.json({
      times : times,
      from : FROM,
      to : TO
    });
  }); 
}

module.exports = {
  fetch : fetch
}
