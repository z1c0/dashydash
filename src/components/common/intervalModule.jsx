'use strict';
var React = require('react');
var misc = require('./misc.jsx');

class IntervalModule extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const self = this;
    this.intervalId = misc.setIntervalAndExecute(function() {
      self.tick();
    }, self.interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
}

module.exports = IntervalModule;