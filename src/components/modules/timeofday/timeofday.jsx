"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../fetchModule.jsx');

class TimeOfDay extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
    }
    this.url = '';
    this.interval = moment.duration(30, 'seconds');
    this.callback = function(body) {
      this.setState({
      });
    }
  }

  render() {
    return (
      <div id='timeofday'>
      </div>
    );
  }
};

module.exports = TimeOfDay;
