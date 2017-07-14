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
    var style = {
      backgroundImage: 'url(' + this.state.image + ')'
    }
    return (
      <div className="picsWrapper">
        <div className='picBlurred' style={style}></div>
        <div className='pic' style={style}></div>
      </div>
    );
  }
};

module.exports = Pics;
