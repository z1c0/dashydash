'use strict';
var React = require('react');
var moment = require('moment');
require('moment/locale/de');
moment.locale('de');
var FetchModule = require('./fetchModule.jsx');

class Calendar extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
      appointments: []
    }
    this.url = URL;
    this.interval = moment.duration(15, 'minutes');
    this.callback = function(body) {
      this.setState({
        appointments : body
      });
    }
  }

  renderIcon() {
    var now = new Date();
    return (
      <div className="icon">
        <time>
          <strong>{moment.months()[now.getMonth()]}</strong>
          <span>{now.getDate()}</span>
        </time>
      </div>
    );
  }

  render() {
    var createModule = function(a, i) {
      return (
        <li key={i}>
          <strong>{a.title}</strong><br/>
          <i><span>{a.due}</span>, <span>{a.time}</span></i>
        </li>);
    };
    return (
      <div id='calendar'>
        <div id={this.props.id}></div>
        { this.renderIcon() }
        <ul>
          {this.state.appointments.map(createModule, this)}
        </ul>
      </div>
    );
  }
};

module.exports = Calendar;