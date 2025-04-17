import axios, { AxiosHeaders } from "axios";
import { Request, Response } from "express";


export type RouteModule = {
	url?: string;
	authorization?: string;
	init?: () => void;
	fetch?(_req: Request, _res: Response): void;
	post?(_req: Request, _res: Response): void;
	testNotification?: () => void;
}

async function tryRequest(m: RouteModule, res: Response, attempt: number) {
	const delay = 2500;
	const maxTries = 3;

	try {
		const response = await axios.get(m.url!, {
			headers: {
				'Authorization': m.authorization,
				'User-Agent': 'axios/dashy-dash'
			}
		});
		res.json(response.data);
	} catch (err) {
		console.log(err);
		if (attempt < maxTries) {
			setTimeout(() => {
				console.log("Retry " + attempt + " for " + m.url);
				tryRequest(m, res, attempt + 1);
			}, delay);
		} else {
			res.end();
		}
	}
}

export async function fetchJson(url: string, headers?: [string, string][]) {
	const headerObject = headers ? new AxiosHeaders(Object.fromEntries(headers)) : new AxiosHeaders();
	try {
		const response = await axios.get(url, {
			headers: {
				'User-Agent': 'axios/dashy-dash',
				...headerObject
			}
		});
		return response.data;
	} catch (err) {
		//console.error("Error fetching JSON:", err);
		return null;
	}
}

type JsonData = Record<string, string>;
export async function postJson(url: string, data: JsonData, headers?: [string, string][]) {
	const headerObject = headers ? new AxiosHeaders(Object.fromEntries(headers)) : new AxiosHeaders();
	try {
		const response = await axios.post(url, data, {
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'axios/dashy-dash',
				...headerObject
			}
		});
		return response.data;
	} catch (err) {
		console.error("Error fetching JSON:", err);
		return null;
	}
}

export function createServerFetcher(m: RouteModule) {
	return function(req: Request, res: Response) {
		if (m.fetch) {
			m.fetch(req, res);
		} else {
			tryRequest(m, res, 1);
		}
	};
}