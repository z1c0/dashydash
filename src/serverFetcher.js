'use strict';
var request = require('request');

module.exports = {
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
