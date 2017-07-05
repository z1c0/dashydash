"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../fetchModule.jsx');


class Calendar extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
    }
    this.url = URL;
    this.interval = moment.duration(30, 'minutes');
    this.callback = function(body) {
      this.setState({
        appointments : body
      });
    }
  }

  render() {
    return (
      <div className='calendar'>
        <h2>{this.state.title}</h2>
        <img src={this.state.image}/>
      </div>
    );
  }
};

module.exports = Calendar;
