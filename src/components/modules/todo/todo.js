'use strict';

const API_KEY = require('../../../secrets.json').todoistApiKey;

module.exports = {
  url : 'https://beta.todoist.com/API/v8/tasks?token=' + API_KEY
}
