'use strict';
var cron = require('cron');
var request = require('request');
var fs = require('fs');
var path = require('path');
const config = require('../../../secrets.json').pics;


const redirectURI  = 'http://localhost';
const browserUrl = 
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  "scope=https://www.googleapis.com/auth/photoslibrary.readonly" + "&" +
  "redirect_uri=" + redirectURI + "&" +
  "response_type=code&" +
  "client_id=" + config.clientId;


const IMAGE_DIR = './dist/images/photos';

const postUrl = "https://www.googleapis.com/oauth2/v4/token";

function retrieveTokens() {
  //console.log(browserUrl);
  const theCode = '4/TgGG4aGPl8RUPTcMoi1333bbDOaMcJRN-zjoo1sW0RCk3maLRJPTySpOKI7Vd-PC3q4RZNlsmfHqrspbTCqH5MQ'
  request.post({
    url : postUrl,
    form : { 
      code : theCode,
      scope : 'https://www.googleapis.com/auth/photoslibrary.readonly',
      client_id : config.clientId,
      client_secret : config.clientSecret,
      redirect_uri : redirectURI,
      grant_type : "authorization_code" }
    }, 
    function(err, httpResponse, body) {
      console.log(body);
    }
  );
}

function refreshToken(config) {
  //console.log(config.refreshToken);
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
        .get(photo.url + "=w2048-h1024")
        .on('error', e => {
          console.log(e);
          reject(e);
        })
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


function createImageListJob(albumId) {
  return function(result) {
    //console.log(albumId);
    return new Promise((resolve, reject) => {
      function doChunk(albumId, nextPageToken) {
        request({
          url: 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
          auth: { 'bearer' : config.token },
          qs : { 'albumId' : albumId, pageSize : 100, 'pageToken' : nextPageToken },
          method: 'POST',
          json : true
        }, function(error, response, body) {
          if (error) {
            console.log(error);
          }
          else {
            try {
                //console.log(body);
                if (body.mediaItems) {
                  //console.log(body.mediaItems.length);
                  let photos = body.mediaItems.reduce((filtered, entry) => {
                    if (entry.mimeType === 'image/jpeg') {
                      const fileName = path.join(IMAGE_DIR, entry.filename);
                      if (!fs.existsSync(fileName)) {
                        filtered.push({
                          fileName : fileName,
                          url : entry.baseUrl
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
            if (body.nextPageToken) {
              //console.log(albumId + ' - ' + body.nextPageToken);
              doChunk(albumId, body.nextPageToken);
            } else {
              resolve(result);
            }
          }
        });
      }

      return doChunk(albumId);
    });
  }
}


function createDownloadList(albumIds) {
  const jobs = albumIds.reduce((r, a) => {
    r.push(createImageListJob(a));
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

function fetchAlbumList(response) {
  // get all albums
  function fetchAlbumChunk(albums, callback, nextPageToken) {
    request({
      url: 'https://photoslibrary.googleapis.com/v1/albums',
      auth: { 'bearer' : config.token },
      qs : { 
        //'pageSize' : '5',
        'pageToken' : nextPageToken
      },
      json : true
    }, function(error, r, body) {
      //console.log(body);
      let chunk = body.albums.reduce((result, a) => {
        if (a.title.startsWith('Family')) { 
          result.push({
            title : a.title,
            id : a.id
          });
        }
        return result;
      }, []);
      albums = albums.concat(chunk);
      if (body.nextPageToken) {
        fetchAlbumChunk(albums, callback, body.nextPageToken);
      } else {
        callback(albums);
      }
    });
  }
  
  let albums = [];
  fetchAlbumChunk(albums, albums => {
    console.log(albums);
    response.send(albums);
  });
}

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
    const p = getRandomPhoto();
    res.json({ url : '/images/photos/' + p });

    // Fetch album list
    //fetchAlbumList(res);
  }
}

