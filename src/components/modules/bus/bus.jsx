"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');


class Bus extends FetchModule {
  constructor(props) {
    super(props);
    this.state = {
      times : [],
      from : '',
      to : ''
    }
    this.interval = moment.duration(1, 'minute');
    this.callback = function(body) {
      this.setState({
        times : body.times,
        from : body.from,
        to : body.to
      });
    }
  }

  render() {
    return (
      <div className='bus'>        
        <i className="e1a-oncoming_bus"></i>
        <div>
          <p>{this.state.from}</p>
          <p>{this.state.to}</p>
        </div>
        {this.state.times.map(function(time, i){
          return <p className='busTime' key={i}>{time}</p>
        })}
      </div>
    );
  }
};

module.exports = Bus;
