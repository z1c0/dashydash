"use strict";
var React = require('react');
var moment = require('moment');
require('moment/locale/de');
moment.locale('de');
var FetchModule = require('../fetchModule.jsx');


class Calendar extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
      appointments: []
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
    var createModule = function(a, i) {
      return (
        <li key={i}>
          <strong>{a.title}</strong><br/>
          <i><span>{a.due}</span>, <span>{a.time}</span></i>
        </li>);
    };
    var now = new Date();
    return (
      <div id='calendar'>
        <h1>{this.props.id}</h1>
        <div id="appointments"></div>
        <div className="icon">
          <time>
            <strong>{moment.months()[now.getMonth()]}</strong>
            <span>{now.getDate()}</span>
          </time>
        </div>
        <ul>
          {this.state.appointments.map(createModule, this)}
        </ul>
      </div>
    );
  }
};

/*
<div id="calendar" class="part">
  </div>
  <div id="birthdays">
    <i class="e1a-birthday"></i>
    <ul data-bind="foreach: appointments">
      <li>
        <strong data-bind="text: title"></strong>
        <i>(<span data-bind="text: due"></span>)</i>
      </li>
    </ul>
  </div>
</div>
*/

module.exports = Calendar;
