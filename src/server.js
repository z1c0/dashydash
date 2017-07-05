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
//console.log(wwwroot);
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
      //console.log(name + ', ' + m.url);
      router.get('/api/' + f.toLowerCase(), new ServerFetcher(m.url, m.transform).fetch);
    }
  });
  return router;
}
app.use(createRoutes());


const port = 3000;
app.listen(port);
console.log('listening on port: ' + port);
