"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');

class TimeOfDay extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
      text : '',
      emoji : '',
      image : ''
    }
    this.interval = moment.duration(1, 'minute');
    this.callback = function(body) {
      this.setState({
        image : body.imageUrl,
        text : body.text,
        emoji : body.emoji,
      });
    }    
  }

  render() {
    var divStyle = {
      backgroundImage: 'url(' + this.state.image + ')'
    }
    return (
      <div className='timeofday'>
        <div className="giphy" style={divStyle}></div>
        <p className='biggest-text'>
          <span>{this.state.text}</span>
          <i className={"icon-text " + this.state.emoji}></i>
        </p>
      </div>
    );
  }
}

module.exports = TimeOfDay;
