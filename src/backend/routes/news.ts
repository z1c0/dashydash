import { Request, Response } from "express";
import { fetchJson } from '../common/serverFetcher';
import secrets from '../secrets.json';
import { Article } from "../../types/types";
const API_KEY: string = secrets.newsApiKey;

const BASE_URL = 'https://newsapi.org/v1/articles?apiKey=' + API_KEY + '&source=';

export function shuffle<T>(o: T[]) {
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

let articles: Article[] = [];
let index = 0;

async function getNews() {
	if (index >= articles.length) {
		const results = await Promise.all([
			fetchJson(BASE_URL + 'focus'),
			fetchJson(BASE_URL + 'die-zeit'),
			fetchJson(BASE_URL + 'wired-de'),
			fetchJson(BASE_URL + 'techcrunch'),
			fetchJson(BASE_URL + 'der-tagesspiegel'),
			fetchJson(BASE_URL + 'spiegel-online')
		]);
		index = 0;
		articles = [];
		results.forEach(a => {
			if (a?.articles) {
				articles = articles.concat(a.articles);
			}
		});
		articles = shuffle(articles);
	}
}

async function getArticle(_req: Request, res: Response) {
	await getNews();
	res.json(articles[index++]);
}

export const News = {
	fetch: getArticle
}
