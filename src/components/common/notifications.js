'use strict'
const request = require('request');
const secrets = require('../../secrets.json');


function getIftttUrl(eventName, key) {
  let url = 'https://maker.ifttt.com/trigger/' + eventName + '/with/key/' + key;
  //console.log(url);
  return url;
}

function sendNotification(notification, channel) {
  //console.log(notification);
  channel = channel || 'new_movie';
  if (secrets.iftttkey) {
    request({
      url: getIftttUrl(channel, secrets.iftttkey),
      method: 'POST',
      json: {
        value1: notification.title,
        value2: notification.image,
        value3: notification.url
      }
    });
  }
}

function sendError(error) {
  sendNotification({
    title : error,
    image : '',
    url : ''
  });
}

module.exports = {
  sendNotification : sendNotification,
  sendError : sendError
}