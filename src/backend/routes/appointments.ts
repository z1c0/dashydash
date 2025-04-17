'use strict';
const serverFetcher = require('../../../serverFetcher');
const calendar = require('../common/calendar.js');
const urls = require('../../../secrets.json').icalUrls;

function fetchIcalData(req, res) {
  let functions = urls.map(url => serverFetcher.fetchJson(url));
  Promise.all(functions).then(iCals => {
    let appointments = iCals.reduce((result, c, i) => result.concat(calendar.getAppointments(c, i)), []);
    appointments.sort(function(a, b) { return a.startDate - b.startDate; });
    res.json(appointments);
  });
}

module.exports = {
  fetch: fetchIcalData
}