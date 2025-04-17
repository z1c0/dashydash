import { Request, Response } from "express";
import secrets from '../secrets.json';
import {fetchJson} from "../common/serverFetcher";

const apiKey: string = secrets.weatherApiKey;

const iconTable = {
	"01d": "wi-day-sunny",
	"02d": "wi-day-cloudy",
	"03d": "wi-cloudy",
	"04d": "wi-cloudy-windy",
	"09d": "wi-showers",
	"10d": "wi-rain",
	"11d": "wi-thunderstorm",
	"13d": "wi-snow",
	"50d": "wi-fog",
	"01n": "wi-night-clear",
	"02n": "wi-night-cloudy",
	"03n": "wi-night-cloudy",
	"04n": "wi-night-cloudy",
	"09n": "wi-night-showers",
	"10n": "wi-night-rain",
	"11n": "wi-night-thunderstorm",
	"13n": "wi-night-snow",
	"50n": "wi-night-alt-cloudy-windy"
};
type IconKey = keyof typeof iconTable;

const LOCATION = 'Freistadt';
const urlCondition = 'http://api.openweathermap.org/data/2.5/weather?q=' + 
	LOCATION +
	'&appid=' + apiKey +
	'&units=metric&lang=de';
const urlForecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + 
	LOCATION +
	'&appid=' + apiKey +
	'&units=metric&lang=de&cnt=3';


async function getWeather(_req: Request, res: Response) {
	const request1 = fetchJson(urlCondition);
	const request2 = fetchJson(urlForecast);
	const results = await Promise.all([request1, request2]);
	let body1 = results[0];
	let forecast = results[1].list.find((i: { dt: number; }) =>
		new Date(i.dt * 1000).getDate() == new Date().getDate()
	);
	let min = 0;
	let max = 0;
	if (forecast) {
		min = Math.round(forecast.temp.min);
		max = Math.round(forecast.temp.max);
	}
	res.json({
		name : body1.name,
		temperature : Math.round(body1.main.temp),
		description : body1.weather[0].description,
		icon : iconTable[body1.weather[0].icon as IconKey],
		min : min,
		max : max
	});
}

export const Weather =  {
	fetch : getWeather
}