'use strict';
var React = require('react');
var Calendar = require('../../common/calendar.jsx');

class Birthdays extends Calendar {
  constructor(props) {
    super(props);
    this.showTime = false;
  }

  renderIcon() {
    return <i className="e1a-birthday"></i>
  }
};

module.exports = Birthdays;
