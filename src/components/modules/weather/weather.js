'use strict';

const apiKey = require('../../../secrets.json').weatherApiKey;
const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + 
  'Gallneukirchen,AT' + // TODO 
  '&appid=' + apiKey +
  '&units=metric&lang=de';

module.exports =  {
  url : url
}
