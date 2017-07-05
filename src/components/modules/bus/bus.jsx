"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../fetchModule.jsx');


class Bus extends FetchModule {
  constructor(props) {
    super(props);
    this.state = {
      times : []
    }
    this.interval = moment.duration(1, 'minute');
    this.callback = function(body) {
      this.setState({
        times : body
      });
    }
  }

  render() {
    return (
      <div id='bus'>
        {this.state.times.map(function(time, i){
          return <p key={i}><span>{time}</span></p>
        })}
      </div>
    );
  }
};

module.exports = Bus;
