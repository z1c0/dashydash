import { Request, Response } from "express";
import * as fs from "node:fs";

const IMAGE_DIR = './dist/images/photos';

function getRandomPhoto() {
	const files = fs.readdirSync(IMAGE_DIR) 
	const index = Math.floor(Math.random() * files.length);
	return files[index];
}

export const Pics = {
	fetch : function(_req: Request, res: Response) {
		const p = getRandomPhoto();
		res.json({ url : '/images/photos/' + p });
	}
}

