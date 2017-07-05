'use strict';
var request = require('request');

module.exports = {
  ServerFetcher : function(url, transform) {
    this.fetch = function(req, res) {
      request.get({
        url : url,
        json : true
      },
      function(err, httpResponse, body) {
        if (err) {
          // TODO
          console.log(err);
          res.end();
        }
        else {
          if (transform) {
            body = transform(body);
          }
          res.json(body);
        }
      });
    }
    return this;
  }
}
