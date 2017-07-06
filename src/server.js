'use strict';
var express = require('express');
var ServerFetcher = require('./serverFetcher').ServerFetcher;


var app = module.exports = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(require('connect-livereload')({
    port: 35729
  }));
}

// load static content before routing takes place
const wwwroot = __dirname + './../dist';
app.use(express['static'](wwwroot));


function createRoutes() {
  //var hugo = require('../hugo');
  var router = express.Router();
  /*
  autoNav.init(router, modules);
  // modules
  modules.forEach(function(m) {
    routingHelper.init(router, 
    m);
  });
  
 */ 

  const fs = require('fs');
  const path = require('path');
  const folderName = __dirname + '/components/modules';
  fs.readdirSync(folderName).forEach(f => {
    var name = folderName + '/' + f + '/' + f + '.js';
    if (fs.existsSync(name)) {
      const m = require(name);
      let route = '/api/' + f.toLowerCase();
      router.get(route, new ServerFetcher(m).fetch);

      /*
      let routes = m.routes;
      if (!routes) {
        routes = [ { name : f.toLowerCase(), url : m.url }];
      }
      routes.forEach(r => {
        let fetch = m.fetch;
        if (!fetch) {
          fetch = new ServerFetcher(r.url, m.transform).fetch;
        }
        router.get('/api/' + r.name , fetch);
      });
      */
    }
  });
  return router;
}
app.use(createRoutes());


const port = 3000;
app.listen(port);
console.log('listening on port: ' + port);
