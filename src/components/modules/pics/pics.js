'use strict';
var cron = require('cron');
var request = require('request');
var fs = require('fs');
var path = require('path');
const config = require('../../../secrets.json').pics;

// get all albums
//https://picasaweb.google.com/data/feed/api/user/default

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

function refreshToken(config) {
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
      config.token = body.access_token;
      //console.log(config.token);
      createDownloadList(config.albumIds);
    }
  });
}

function createDownloadJob(photo) {
  return new Promise(
    function(resolve, reject) {
      console.log("GET: " + photo.url);
      request
        .get(photo.url + "?imgmax=1280")
        .pipe(fs.createWriteStream(photo.fileName)
          .on('finish', resolve)
        );
    }
  ).catch((e) => {
    console.log(e);
  });
}

const CHUNK_SIZE = 10;
function createDownloadJobs(jobs) {
  //console.log(jobs);
  let job = jobs.splice(0, CHUNK_SIZE);
  if (job.length) {
    const p = Promise.all(job.map(createDownloadJob));
    p.then(() => {
      createDownloadJobs(jobs);
    });
    
  }
}

function getRandomPhoto(callback) {
  // TODO: jpeg filter
  let files = fs.readdirSync(IMAGE_DIR) 
  let index = Math.floor(Math.random() * files.length);
  return files[index];
}


function createImageListJob(albumId, startIndex) {
  return function(result) {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://picasaweb.google.com/data/feed/api/user/default/albumid/' + albumId,
        headers: {
          'GData-Version': '2'
        },
        qs: {
          access_token : config.token,
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
                let photos = body.feed.entry.reduce((filtered, entry) => {
                  if (entry.content.type === 'image/jpeg') {
                    const fileName = path.join(IMAGE_DIR, entry.title["$t"]);
                    if (!fs.existsSync(fileName)) {
                      filtered.push({
                        fileName : fileName,
                        url : entry.content.src
                      });
                    }
                  }
                  return filtered;
                }, []);
                result.push(...photos);
              }
          }
          catch (e) {
            console.log(e)
          }
          resolve(result);
        }
      });
    });
  }
}


function createDownloadList(albumIds) {
  const jobs = albumIds.reduce((r, a) => {
    r.push(createImageListJob(a, 1));
    r.push(createImageListJob(a, 1000));
    return r;
  }, []);

  jobs.reduce((prev, curr) => prev.then(curr), Promise.resolve([]))
  .then((photoList) => {
    //console.log(photoList);
    createDownloadJobs(photoList);
  });
}


function checkForNewPhotos(config) {
  refreshToken(config);
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

