import ical from "ical";
import moment, { Moment } from 'moment';
import 'moment/locale/de';
import { Appointment } from '../../types/types'

moment.locale('de');

const maximumEntries = 20;
const maximumNumberOfDays = 200;

function isFullDayEvent(event: ical.CalendarComponent) {
	const start = event.start || 0;
	const startDate = new Date(start);
	if (startDate.getHours() === 0 && startDate.getMinutes() === 0) {
		// Is 24 hours, and starts on the middle of the night.
		return true;
	}
	
	return false;
}

function formatDuration(startDate: Moment): string {
	const today = moment().startOf("day").toDate();
	const days = startDate.diff(today, 'days');
	if (days === 0) {
		return 'heute'; 
	}
	else if (days === 1) {
		return 'morgen'; 
	}
	else if (days === 2) {
		return 'übermorgen';
	}
	return startDate.format('dd. Do MMMM');
}

function formatTime(a: Appointment): string {
	if (a.fullDayEvent) {
		return 'ganztägig';
	}
	const from = moment(a.startDate).format('HH:mm');
	const to = moment(a.endDate).format('HH:mm');
	return from + ' - ' + to;
}

export function getAppointments(text: string, calendarId: number) {
	//console.log(text);
	const data = ical.parseICS(text);
	//console.log(data);
	let appointments: Appointment[] = [];
	const now = moment();
	const today = moment().startOf("day");
	const future = moment().startOf("day").add(maximumNumberOfDays, "days").subtract(1, "seconds"); // Subtract 1 second so that events that start on the middle of the night will not repeat.
	const limitFunction = function(_: Date, i: number) { return i < maximumEntries; };

	function add(title: string, startDate: Moment, endDate: Moment, fullDayEvent: boolean) {
		const a : Appointment = {
			title,
			startDate,
			endDate,
			fullDayEvent,
			due: formatDuration(startDate),
		};
		a.time = formatTime(a);
		if (calendarId >= 0) {
			a.id = calendarId;
		}
		appointments.push(a);
	}

	for (const e in data) {
		var event = data[e];
		if (event.type === "VEVENT") {
			let startDate = moment(event.start);
			let endDate;
			if (event.end) {
				endDate = moment(event.end);
			}
			else {
				endDate = startDate;
			}

			// calculate the duration f the event for use with recurring events.
			const duration = parseInt(endDate.format("x")) - parseInt(startDate.format("x"));

			var title = "Event";
			if (event.summary) {
				title = event.summary;
			}
			else if (event.description) {
				title = event.description;
			}

			if (event.rrule) {
				const rule = event.rrule;
				//console.log(rule);
				var dates = rule.between(today.toDate(), future.toDate(), true, limitFunction);

				if (dates.length > 0) {
					for (var d in dates) {
						startDate = moment(new Date(dates[d]));
						endDate = moment(parseInt(startDate.format("x")) + duration, 'x');
						if (endDate.isAfter(now)) {
							add(title, startDate, endDate, isFullDayEvent(event));
						}
					}
				}
				else {
					if (endDate.isAfter(now)) {
						add(title, startDate, endDate, true);
					}
				}
			}
			else {
				// console.log("Single event ...");
				// Single event.
				var fullDayEvent = isFullDayEvent(event);

				if (!fullDayEvent && endDate < now) {
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

				// Everything is good. Add it to the list.
				add(title, startDate, endDate, fullDayEvent);
			}
		}
	}

	appointments.sort(function(a, b) {
		return a.startDate.isBefore(b.startDate) ? -1 : 1;
	});
	appointments = appointments.slice(0, maximumEntries);
	//console.log(appointments);
	return appointments;
}

export const Calendar = {
	getAppointments: (text: string) => getAppointments(text, 0)
}