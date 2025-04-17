import { Request, Response } from "express";
import {fetchJson, RouteModule} from "../common/serverFetcher";
import {TimeOfDayInfo} from "../common/timeOfDayInfo";

async function getInfos(_req: Request, res: Response) {
	const data = TimeOfDayInfo.get();
	const giphyUrl = 'https://api.giphy.com/v1/gifs/random?api_key=NE1oJoC7rIPJSEjIW13oeAtNA3XUT13F&rating=PG&tag=' + data.tag;
	const body = await fetchJson(giphyUrl);
	res.json({
		imageUrl : body?.data?.images?.original?.url,
		text : data.text,
		emoji : data.emoji,
	});
}

export const TimeOfDay: RouteModule =  {
	fetch : getInfos,
}
