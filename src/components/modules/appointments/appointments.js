'use strict';

module.exports = {
  url : require('../../../secrets.json').icalUrl,
  transform : require('../../common/calendar.js').getAppointments
}
