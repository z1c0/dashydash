import {Request, Response} from "express";
import {Calendar} from "../common/calendar";
import {fetchJson, RouteModule} from "../common/serverFetcher";
import secrets from '../secrets.json';

async function fetchIcalData(_req: Request, res: Response) {
	const ical = await fetchJson(secrets.icalBdaysUrl)
	res.json(Calendar.getAppointments(ical));
}

export const Birthdays: RouteModule = {
	fetch: fetchIcalData,
}
