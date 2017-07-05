"use strict";
var React = require('react');
var FetchModule = require('../fetchModule.jsx');
var moment = require('moment');

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

class Weather extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
      name : '',
      description : '',
      temperature : '',
      icon : ''
    }
    this.interval = moment.duration(15, 'minutes');
    this.callback = function(body) {
      this.setState({
        name : body.name,
        temperature : Math.round(body.main.temp),
        description : body.weather[0].description.lowercaseFirst(),
        icon : iconTable[body.weather[0].icon]
      });
    }
  }

  render() {
    return (
      <div id='weather'>
        <p><span>{this.state.name}, {this.state.description}</span></p>
        <i className={`wi ${ this.state.icon }`}></i>
        <span className="temperature">{this.state.temperature}</span><span className="temperature">°C</span>
      </div>
    );
  }
};

module.exports = Weather;
