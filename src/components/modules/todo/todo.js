'use strict';

const API_KEY = require('../../../secrets.json').todoistApiKey;

module.exports = {
  url : 'https://api.todoist.com/rest/v1/tasks?token=' + API_KEY
}
