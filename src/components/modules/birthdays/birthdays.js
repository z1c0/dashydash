'use strict';

module.exports = {
  url : require('../../../secrets.json').icalBdaysUrl,
  transform : require('../../common/calendar.js').getAppointments
}
