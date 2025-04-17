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

  getCalendarColor(index) {
    console.log(index);
    const cols = [
      '#027696',
      '#A38FD0'
    ];
    return cols[index % cols.length];
  }

  render() {
    var createModule = function (a, i) {
      const time = this.showTime ? (<span>, {a.time}</span>) : null;
      const isToday = !moment().isBefore(a.startDate, 'day');
      let calCol = '';
      if (isToday) {
        calCol = 'rgb(224, 224, 56)';
      }
      else if (typeof(a.id) !== 'undefined') {
        //calCol = this.getCalendarColor(a.id);
      }
      return (
        <li key={i} style={{ borderColor: calCol}}>
          <strong>{a.title}</strong><br />
          <i className="small-text"><span>{a.due}</span>{time}</i>
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