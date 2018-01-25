'use strict';
var path = require('path');
var Datastore = require('nedb');

var dbs = {};

module.exports = {
  get: function(name) {
    if (!dbs[name]) {
      let filename = path.join(__dirname, "../../../store", name + '.json')
      console.log('Creating DB: ' + name + '(' + filename + ')');
      let store = new Datastore({ filename: filename, autoload: true });
      dbs[name] = store;
    }
    return dbs[name];
  }
};