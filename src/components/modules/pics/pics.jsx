"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');
var misc = require('../../common/misc.jsx');

class Pics extends FetchModule {
  constructor(props) {
    super(props);
    this.state = {
      image : ''
    }
    this.interval = moment.duration(misc.randomIntFromInterval(20, 30), 'seconds');
    this.callback = function(body) {
      this.setState({
        image : body.url
      });
    }
  }

  render() {
    var style = {
      backgroundImage: 'url(' + this.state.image + ')'
    }
    return (
      <div className='pic' style={style}></div>
    );
  }
};

module.exports = Pics;
