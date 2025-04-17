import {Request, Response} from "express";
import { getAppointments} from "../common/calendar";
import {fetchJson} from "../common/serverFetcher";
import secrets from '../secrets.json';
import { Appointment } from "../../types/types";

const urls: string[] = secrets.icalUrls;

async function fetchIcalData(_req: Request, res: Response) {
	const functions = urls.map(url => fetchJson(url));
	const iCals = await Promise.all(functions);
	let appointments: Appointment[] = iCals.reduce((result: Appointment[], c, i: number) => result.concat(getAppointments(c, i)), []);
	//console.log(appointments);
	appointments.sort(function (a, b) {
		return a.startDate.isBefore(b.startDate) ? -1 : 1;
	});
	res.json(appointments);
}

export const Appointments = {
	fetch: fetchIcalData
}