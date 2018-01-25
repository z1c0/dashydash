'use strict';
var request = require('request');

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
      else
      {
        request.get({
          url : m.url,
          json : true
        },
        function(err, httpResponse, body) {
          if (err) {
            console.log(err);
            res.end();
          }
          else {
            if (m.transform) {
              body = m.transform(body);
            }
            res.json(body);
          }
        });
      }
    }
    return this;
  }
}
