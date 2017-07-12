'use strict';
var serverFetcher = require('../../../serverFetcher');

const API_KEY = require('../../../secrets.json').newsApiKey;
const BASE_URL = 'https://newsapi.org/v1/articles?apiKey=' + API_KEY + '&source=';

function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

var articles = [];
var index = 0;

function getNews() {
  if (index >= articles.length) {
    return Promise.all([
      serverFetcher.fetchJson(BASE_URL + 'focus'),
      serverFetcher.fetchJson(BASE_URL + 'die-zeit'),
      serverFetcher.fetchJson(BASE_URL + 'wired-de'),
      serverFetcher.fetchJson(BASE_URL + 'the-new-york-times'),
      serverFetcher.fetchJson(BASE_URL + 'der-tagesspiegel'),
      serverFetcher.fetchJson(BASE_URL + 'spiegel-online')
    ])
    .then(function (results) {
      articles = [];
      results.forEach(r => {
        articles = articles.concat(r.articles);
      });
      shuffle(articles);
    });
  }
  else {
    return Promise.resolve();
  }
}

function getArticle(req, res) {
  getNews().then(() => {
    res.json(articles[index++]);
  });
}

module.exports = {
  fetch: getArticle
}
