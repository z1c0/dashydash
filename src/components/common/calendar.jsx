'use strict';
var React = require('react');
var moment = require('moment');
require('moment/locale/de');
moment.locale('de');
var FetchModule = require('./fetchModule.jsx');

class Calendar extends FetchModule {
  constructor(props) {
    super(props);
    this.state = {
      appointments: []
    }
    this.showTime = true;
    this.url = URL;
    this.interval = moment.duration(15, 'minutes');
    this.callback = function (body) {
      this.setState({
        appointments: body
      });
    }
  }

  renderIcon() {
    var now = new Date();
    return (
      <time>
        <strong>{moment.months()[now.getMonth()]}</strong>
        <span>{now.getDate()}</span>
      </time>
    );
  }

  render() {
    var createModule = function (a, i) {
      let time = this.showTime ? (<span>, {a.time}</span>) : null;
      return (
        <li key={i}>
          <strong>{a.title}</strong><br />
          <i><span>{a.due}</span>{time}</i>
        </li>);
    };
    return (
      <div className='calendar'>
        <div className="icon">
          {this.renderIcon()}
        </div>
        <ul>
          {this.state.appointments.map(createModule, this)}
        </ul>
      </div>
    );
  }
};

module.exports = Calendar;