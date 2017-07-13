'use strict';
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');


class Football extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
    }
    this.interval = moment.duration(1, 'hour');
    this.callback = function(body) {
      this.setState({
      });
    }
  }

  render() {
    return (
      <div id='football'>
      </div>
    );
  }
};

module.exports = Football;
