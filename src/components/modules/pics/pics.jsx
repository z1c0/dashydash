"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');


class Pics extends FetchModule {
  constructor(props) {
    super(props);
    this.state = {
      image : ''
    }
    this.interval = moment.duration(20, 'seconds');
    this.callback = function(body) {
      this.setState({
        image : body.url
      });
    }
  }

  render() {
    return (
      <div id='pics'>
        <img src={this.state.image}></img>
      </div>
    );
  }
};

module.exports = Pics;
