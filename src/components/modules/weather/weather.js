'use strict';
var serverFetcher = require('../../../serverFetcher');

const iconTable = {
  "01d": "wi-day-sunny",
  "02d": "wi-day-cloudy",
  "03d": "wi-cloudy",
  "04d": "wi-cloudy-windy",
  "09d": "wi-showers",
  "10d": "wi-rain",
  "11d": "wi-thunderstorm",
  "13d": "wi-snow",
  "50d": "wi-fog",
  "01n": "wi-night-clear",
  "02n": "wi-night-cloudy",
  "03n": "wi-night-cloudy",
  "04n": "wi-night-cloudy",
  "09n": "wi-night-showers",
  "10n": "wi-night-rain",
  "11n": "wi-night-thunderstorm",
  "13n": "wi-night-snow",
  "50n": "wi-night-alt-cloudy-windy"
};

const apiKey = require('../../../secrets.json').weatherApiKey;
const LOCATION = 'Gallneukirchen';
const urlCondition = 'http://api.openweathermap.org/data/2.5/weather?q=' + 
  LOCATION +
  '&appid=' + apiKey +
  '&units=metric&lang=de';
const urlForecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + 
  LOCATION +
  '&appid=' + apiKey +
  '&units=metric&lang=de&cnt=1';


function getWeather(req, res) {
  Promise.all([
    serverFetcher.fetchJson(urlCondition),
    serverFetcher.fetchJson(urlForecast)
  ])
  .then(function(result) {
    let body1 = result[0];
    let body2 = result[1];
    res.json({
      name : body1.name,
      temperature : Math.round(body1.main.temp),
      description : body1.weather[0].description,
      icon : iconTable[body1.weather[0].icon],
      min : Math.round(body2.list[0].temp.min),
      max : Math.round(body2.list[0].temp.max)
    });
  });

}

module.exports =  {
  fetch : getWeather
}
