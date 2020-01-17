"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');


class Weather extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
      name : '',
      description : '',
      temperature : '',
      min : '',
      max : '',
      icon : ''

    }
    this.interval = moment.duration(25, 'minutes');
    this.callback = function(body) {
      this.setState({
        name : body.name,
        temperature : body.temperature,
        min : body.min,
        max : body.max,
        description : body.description,
        icon : body.icon
      });
    }
  }

  render() {
    return (
      <div className='weather big-text'>
        <p>{this.state.description}</p>
         <i className={"biggest-text " + `wi ${ this.state.icon }`}></i>
        <span className="temperature biggest-text">{this.state.temperature} °C</span>
        <span id="minTemp"> &darr; </span><span>{this.state.min}°</span>
        <span id="maxTemp"> &uarr; </span><span>{this.state.max}°</span>
      </div>
    );
  }
};

module.exports = Weather;
