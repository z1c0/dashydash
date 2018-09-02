'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const ServerFetcher = require('./serverFetcher').ServerFetcher;

var app = module.exports = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(require('connect-livereload')({
    port: 35729
  }));
}

// load static content before routing takes place
const wwwroot = __dirname + './../dist';
app.use(express['static'](wwwroot));

app.use(bodyParser.json());

function createRoutes() {
  var router = express.Router();

  const fs = require('fs');
  const folderName = __dirname + '/components/modules';
  fs.readdirSync(folderName).forEach(f => {
    const name = folderName + '/' + f + '/' + f + '.js';
    if (fs.existsSync(name)) {
      const m = require(name);
      if (m.init) {
        m.init();
      }
      const route = '/api/' + f.toLowerCase();
      router.get(route, new ServerFetcher(m).fetch);
      if (m.post) {
        router.post(route, m.post);
      }
    }
  });
  return router;
}
app.use(createRoutes());

const port = 3000;
app.listen(port);
console.log('listening on port: ' + port);
