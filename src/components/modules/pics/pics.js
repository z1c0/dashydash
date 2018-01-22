'use strict';
var cron = require('cron');
var request = require('request');
var fs = require('fs');
var path = require('path');
const config = require('../../../secrets.json').pics;

/*
const redirectURI  = 'http://localhost';
const browserUrl = 
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  "scope=https://picasaweb.google.com/data" + "&" +
  "redirect_uri=" + redirectURI + "&" +
  "response_type=code&" +
  "client_id=" + this.config.clientId;
*/

const IMAGE_DIR = './dist/images/photos';

const postUrl =  "https://www.googleapis.com/oauth2/v4/token";

function retrieveTokens() {
  const theCode = "4/bPO_fjOJ1RkccDs4xFhfkn5_-JVWnwAWolJtuqrD4FI#";
  request.post({
    url : postUrl,
    form : { 
      code : theCode,
      client_id : this.config.clientId,
      client_secret : this.config.clientSecret,
      redirect_uri : redirectURI,
      grant_type : "authorization_code" }
    }, 
    function(err, httpResponse, body) {
      console.log(body);
    }
  );
}

function refreshToken(config, callback) {
  request.post({
    url : postUrl,
    form : { 
      refresh_token : config.refreshToken,
      client_id : config.clientId,
      client_secret : config.clientSecret,
      grant_type : "refresh_token"
    },
    json : true 
  },
  function(err, httpResponse, body) {
    if (err) {
      // TODO!
      console.log(err);
    }
    else {
      callback(config, body.access_token, 1);
      callback(config, body.access_token, 1000);
    }
  });
}

function parseEntry(entry)  {
  if (entry.content.type === 'image/jpeg') {
    return {
      name : entry.title["$t"],
      url : entry.content.src
    }
  }
  else {
    console.log(entry);
  }
  return null;
}

function updatePhotos(config, token, startIndex) {
  //console.log('updatePhotos - token: ' + token + ' (' + startIndex + ')');
  request({
    url: 'https://picasaweb.google.com/data/feed/api/user/default/albumid/' + config.albumId,
    headers: {
      'GData-Version': '2'
    },
    qs: {
      access_token : token,
      kind : 'photo',
      alt : 'json',
      'start-index' : startIndex,
      fields : 'gphoto:numphotos, entry(title, content)'
    },
    method: 'GET',
    json : true
  }, function(error, response, body) {
    if (error) {
      console.log(error);
    }
    else {
      try {
          //console.log(body);
          if (body.feed && body.feed.entry) {
            //console.log(body.feed.entry.length);
            var photos = body.feed.entry.map(
              entry => parseEntry(entry)
            );
            let p = Promise.resolve();
            photos.forEach(photo => {
              p = p.then(fetchPhoto(photo));
            });
        }
      }
      catch (e) {
        console.log(e)
      }
    }
  });
}

function fetchPhoto(photo) {
  const fileName = path.join(IMAGE_DIR, photo.name);
  if (fs.existsSync(fileName)) {
    return Promise.resolve();
  }
  else {
    return new Promise(function(resolve, reject) {
      console.log("GET: " + photo.url);
      request(
        { url : photo.url + '?imgmax=1280' },
        function(err, res, body) {
          if (err) {
            return reject(err);
          }
          res.pipe(fs.createWriteStream(fileName));
          //console.log("done: " + photo.name + " - " + body.length);
          return resolve(body);
        });
    });
  }
}

function getRandomPhoto(callback) {
  // TODO: jpeg filter
  let files = fs.readdirSync(IMAGE_DIR) 
  let index = Math.floor(Math.random() * files.length);
  return files[index];
}


function checkForNewPhotos(config) {
  refreshToken(config, updatePhotos);
}

//retrieveTokens();


module.exports = {
  init : function() {
    // every hour
    var cronJob = cron.job("0 0 */1 * * *", function() {
      checkForNewPhotos(config);
    });
    cronJob.start();
    checkForNewPhotos(config);
  },
  
  fetch : function(req, res) {
    var p = getRandomPhoto();
    res.json({ url : '/images/photos/' + p });
  }
}

