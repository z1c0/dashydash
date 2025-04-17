import { Request, Response } from "express";
import moment from "moment";
import * as cheerio from 'cheerio';
import { fetchJson } from "../common/serverFetcher";


function padRight(s: string, maxLen: number) {
	let pad = new Array(maxLen + 1 - s.length).join(' ');
	return s + pad;
}

//const FROM = 'Gallneukirchen, Marktplatz';
//const TO = 'Linz, Hessenplatz';
const FROM = 'Gallneukirchen';
const TO = "Linz Altenberger Straße (B125)";
const URL = 'http://fahrplan.oebb.at/bin/query.exe/dn?start=1&S=' +
	encodeURIComponent(FROM) +'&Z=' + encodeURIComponent(TO) +
	'&timesel=depart&time='


function transform(body: string) {
	const $ = cheerio.load(body);
	let i = 0;
	let times = [];

	// eslint-disable-next-line no-constant-condition
	while (true) {
		let row = $('#trOverviewC0-' + i++);
		if (row.length === 0) {
			break;
		}

		let changes = row.find('.changes').text().trim();
		if (changes === '0') {  // only direct connections please
			let from = row.find('.station div').eq(0).text().trim();
			let departs: string = row.find('.planed').eq(0).html()!.split('<br>')[0].trim().substr(0, 5);
			let duration = row.find('.duration').text().trim();
			let line = row.find('.product').first().attr('title')!.trim();
			let prefix = from.indexOf('Marktplatz') > 0 ? 'M' : 'A';
			let time = padRight(prefix + ':' + line.substr(4), 4) + ' ' + departs + ' ' + duration;
			//console.log(from);
			times.push(time);
		}
	}
	return times;
}

async function requestAsync(offset: number) {
	let time = moment().add(offset, 'minutes').format('HH:mm');
	let url = URL + time;
	const body = await fetchJson(url);
	//console.log(body);
	return transform(body);
}

async function fetch(_req: Request, res: Response) {
	const requests = [ requestAsync(0) ];
	if (moment().hour() < 23) {
		// Careful when it gets close to midnight or we will get bus time for THIS day's early hours.
		requests.push(requestAsync(15));
		requests.push(requestAsync(30));
	}

	let all = await Promise.all(requests);
	let times = all.flat();
	//console.log(times);
	// remove duplicates
	times = times.filter(function(value, index) { return times.indexOf(value) === index })
	res.json({
		times : times,
		from : FROM,
		to : TO
	});
}

export const Bus = {
	fetch
}