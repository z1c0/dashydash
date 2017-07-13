'use strict';
var React = require('react');
var moment = require('moment');
var IntervalModule = require('../../components/common/intervalModule.jsx');


class ColorTile extends IntervalModule {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.interval = moment.duration(25, 'second');
    this.tick = () => {
      this.setState({ 
      });
    }
  }
  
  render() {
    return (
      <div class="colorTile">
      </div>
    );
  }
};

module.exports = ColorTile;
