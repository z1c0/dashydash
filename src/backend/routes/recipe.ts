import { Request, Response } from "express";
import {fetchJson} from "../common/serverFetcher";

async function getRecipe(_req: Request, res: Response) {
	// query can be empty
	const all = await fetchJson('https://api.chefkoch.de/v2/recipes?descendCategories=1&order=0&minimumRating=3&maximumTime=0&query=vegetarisch&limit=1&orderBy=7&hasImage=1');
	const id = all.results[Math.floor(Math.random() * all.results.length)].recipe.id;
	//console.log(id);
	const r = await fetchJson('https://api.chefkoch.de/v2/aggregations/recipe/screen/' + id);
	//console.log(r);
	const imageId = r?.recipe?.previewImageId;
	res.json({
		title : r?.recipe?.title,
		text : r?.recipe?.subtitle,
		image : 'http://api.chefkoch.de/v2/recipes/' + r?.recipe?.id + '/images/' + imageId + '/crop-420x280',
		url : r?.recipe?.siteUrl
	});
}

export const Recipe =  {
	fetch : getRecipe,
}
