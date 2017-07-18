'use strict';
var serverFetcher = require('../../../serverFetcher');

const API_KEY = require('../../../secrets.json').weatherApiKey;
const LOCATION = 'AT/Gallneukirchen';

const urlCondition = 'https://api.wunderground.com/api/' +
  API_KEY + '/conditions/lang:DL/q/' + LOCATION + '.json';

const urlForecast = 'https://api.wunderground.com/api/' +
  API_KEY + '/forecast/lang:DL/q/' + LOCATION + '.json';

function getWeather(req, res) {
  Promise.all([
    serverFetcher.fetchJson(urlCondition),
    serverFetcher.fetchJson(urlForecast)
  ])
  .then(function(result) {
    let body1 = result[0];
    let body2 = result[1];
    res.json({
      name : body1.current_observation.display_location.city,
      temperature : Math.round(body1.current_observation.temp_c),
      description : body1.current_observation.description,
      icon : body1.current_observation.icon_url,
      min : Math.round(body2.forecast.simpleforecast.forecastday[0].low.celsius),
      max : Math.round(body2.forecast.simpleforecast.forecastday[0].high.celsius),
    });
  });
}

module.exports =  {
  fetch : getWeather
}
