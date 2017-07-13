'use strict';
var React = require('react');

function setIntervalAndExecute(f, t) {
  f();
  return setInterval(f, t);
}


class IntervalModule extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const self = this;
    this.intervalId = setIntervalAndExecute(function() {
      self.tick();
    }, self.interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
}

module.exports = IntervalModule;