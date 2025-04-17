'use strict';
const cron = require('cron');
const moment = require('moment');
const notifications = require('../../common/notifications');
const serverFetcher = require('../../../serverFetcher');
const calendar = require('../../common/calendar.js');
const url = require('../../../secrets.json').icalBdaysUrl;

function isToday(momentDate) {
  const TODAY = moment().startOf('day');
  return momentDate.isSame(TODAY, 'd');
}

function sendNotification() {
  serverFetcher.fetchJson(url).then(ical => {
    let appointments = calendar.getAppointments(ical, 0);
    let bdays = appointments.filter(a => isToday(a.startDate));
    bdays.forEach(bday => {
      //console.log(bday.title);
      notifications.sendNotification({ title : bday.title }, 'bday');
    });
  });
}

module.exports = {
  init: function () {
    // each day at 10 AM
    const cronJob = cron.job("0 0 10 * * *", () => {
      sendNotification();
    });
    cronJob.start();
  },

  url : url,

  transform : calendar.getAppointments
}
