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

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const newLocation = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
    //console.log(newLocation);
    window.location.href = newLocation;
  }
  
  render() {
    return (
      <div>
        <a href="#" onClick={this.handleClick}>
          <div id="home"><i className="fa fa-home big-text"></i></div>
        </a>
        <div id="datetime">
          <span className="time big-text">{this.state.time}</span>
          <span className="seconds normal-text">{this.state.seconds}</span>
        </div>
      </div>
    );    
  }
};

module.exports = Overlays;
