'use strict';
var request = require('request');


function tryRequest(m, res, attempt) {
  const delay = 2500;
  const maxTries = 3;

  request.get({
    url : m.url,
    json : true
  },
  function(err, _httpResponse, body) {
    if (err) {
      console.log(err);
      if (attempt < maxTries) {
        setTimeout(() => { 
          console.log("Retry " + attempt + " for " + m.url);
          tryRequest(m, res, attempt + 1)
        }, delay);
      }
      else {
        res.end();
      }
    }
    else {
      if (m.transform) {
        body = m.transform(body);
      }
      res.json(body);
    }
  });
}

module.exports = {
  fetchJson : function(url) {
    return new Promise(function(resolve, reject) {
      request(
        { url : url, json : true},
        function(err, res, body) {
          if (err) {
            return reject(err);
          }
          return resolve(body);
        });
    });
  },

  ServerFetcher : function(m) {
    this.fetch = function(req, res) {
      if (m.fetch) {
        m.fetch(req, res);
      }
      else {
        tryRequest(m, res, 1);
      }
    }
    return this;
  }
}
