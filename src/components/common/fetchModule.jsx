"use strict";

var React = require('react');

function setIntervalAndExecute(f, t) {
  f();
  return setInterval(f, t);
}

String.prototype.lowercaseFirst = String.prototype.lowercaseFirst || function() {
  return this.charAt(0).toLowerCase() + this.slice(1);
}



class FetchModule extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const self = this;
    this.intervalId = setIntervalAndExecute(function() {
      const opts = {
        method: 'GET'
      };
      let url = '/api/' + self.constructor.name.lowercaseFirst();
      fetch(url, opts).then(function(response) {
        return response.json();
      })
      .then(function(body) {
        self.callback(body);
      })
      .catch(function(error) {
        console.log('Error: ', error);
      });
    }, self.interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
}

module.exports = FetchModule;