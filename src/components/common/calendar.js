'use strict';
var ical = require('ical')
var moment = require('moment');
moment.locale('de');

const maximumEntries = 10;
const maximumNumberOfDays = 200;

function isFullDayEvent(event) {
  if (event.start.length === 8) {
    return true;
  }
  var start = event.start || 0;
  var startDate = new Date(start);
  var end = event.end || 0;

  if (end - start === 24 * 60 * 60 * 1000 && startDate.getHours() === 0 && startDate.getMinutes() === 0) {
    // Is 24 hours, and starts on the middle of the night.
    return true;
  }
  return false;
};

function formatDuration(startDate) {
  const today = moment().startOf("day").toDate();
  const days = moment(startDate).diff(today, 'days');
  if (days === 0) {
    return 'heute'; 
  }
  else if (days === 1) {
    return 'morgen'; 
  }
  return moment.duration(moment(startDate).diff(today)).humanize(true);
}

function formatTime(a) {
  if (a.fullDayEvent) {
    return 'ganztägig';
  }
  const from = moment(a.startDate).format('HH:mm');
  const to = moment(a.endDate).format('HH:mm');
  return from + ' - ' + to;
}

function getAppointments(text) {
  const data = ical.parseICS(text);
  let appointments = [];
  const now = new Date();
  const today = moment().startOf("day").toDate();
  const future = moment().startOf("day").add(maximumNumberOfDays, "days").subtract(1, "seconds").toDate(); // Subtract 1 second so that events that start on the middle of the night will not repeat.
  const limitFunction = function(date, i) { return i < maximumEntries; };

  function add(title, startDate, endDate, fullDayEvent) {
    let a = {
      title: title,
      startDate : startDate,
      endDate : endDate,
      fullDayEvent : fullDayEvent,
    };
    a.due = formatDuration(startDate);
    a.time = formatTime(a);
    appointments.push(a);
  }

  for (var e in data) {
    var event = data[e];
    if (event.type === "VEVENT") {
      var startDate = (event.start.length === 8) ? moment(event.start, "YYYYMMDD") : moment(new Date(event.start));
      var endDate;
      if (typeof event.end !== "undefined") {
        endDate = (event.end.length === 8) ? moment(event.end, "YYYYMMDD") : moment(new Date(event.end));
      }
      else {
        endDate = startDate;
      }

      // calculate the duration f the event for use with recurring events.
      var duration = parseInt(endDate.format("x")) - parseInt(startDate.format("x"));

      if (event.start.length === 8) {
        startDate = startDate.startOf("day");
      }

      var title = "Event";
      if (event.summary) {
        title = (typeof event.summary.val !== "undefined") ? event.summary.val : event.summary;
      }
      else if (event.description) {
        title = event.description;
      }

      if (typeof event.rrule != "undefined") {
        var rule = event.rrule;
        var dates = rule.between(today, future, true, limitFunction);

        for (var d in dates) {
          startDate = moment(new Date(dates[d]));
          endDate = moment(parseInt(startDate.format("x")) + duration, 'x');
          if (endDate.format("x") > now) {
            add(title, startDate, endDate, isFullDayEvent(event));
          }
        }
      }
      else {
        // console.log("Single event ...");
        // Single event.
        var fullDayEvent = isFullDayEvent(event);

        if (!fullDayEvent && endDate < new Date()) {
          //console.log("It's not a fullday event, and it is in the past. So skip: " + title);
          continue;
        }

        if (fullDayEvent && endDate <= today) {
          //console.log("It's a fullday event, and it is before today. So skip: " + title);
          continue;
        }

        if (startDate > future) {
          //console.log("It exceeds the maximumNumberOfDays limit. So skip: " + title);
          continue;
        }

        // Every thing is good. Add it to the list.					
        add(title, startDate, endDate, fullDayEvent);
      }
    }
  }
  appointments.sort(function(a, b) { return a.startDate - b.startDate; });
  appointments = appointments.slice(0, maximumEntries);
  //console.log(appointments);
  return appointments;
}

module.exports = {
  getAppointments : getAppointments
}