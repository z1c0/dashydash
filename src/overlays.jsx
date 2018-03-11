'use strict';
var React = require('react');
var moment = require('moment');
var IntervalModule = require('./components/common/intervalModule.jsx');

class Overlays extends IntervalModule {
  constructor(props) {
    super(props);
    this.state = {
      time : '',
      seconds : ''
    }
    this.interval = moment.duration(1, 'second');
    this.tick = () => {
      let now = moment();
      this.setState({ 
        time : now.format('HH:mm'),
        seconds : now.format('ss')
      });
    }
  }
  
  render() {
    return (
      <div>
        <div id="home">
          <a href="/"><i className="fa fa-home big-text"></i></a>
        </div>
        <div id="datetime">
          <span className="time big-text">{this.state.time}</span>
          <span className="seconds normal-text">{this.state.seconds}</span>
        </div>
      </div>
    );    
  }
};

module.exports = Overlays;
