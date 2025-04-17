import { Color } from './color';
import { Display } from './display';

export class Frame {
	pixels : Color[][];
	
	constructor(pixels: Color[][]) {
		this.pixels = pixels;
	}

	draw(display: Display, offsetX: number, offsetY: number) {
		for (let y = 0; y < this.pixels.length; y++) {
			for (let x = 0; x < this.pixels[y].length; x++) {
				const c = this.pixels[y][x];
				if (c && display.inBounds(offsetX + x, offsetY + y)) {
					display.setPixel(offsetX + x, offsetY + y, c);
				}
			}
		}
	}
}

export class Sprite {
	frames: Frame[];
	display: Display;
	x: number;
	y: number;

	constructor(display: Display, x: number, y: number, frames: Array<Frame>) {
		this.display = display;
		this.x = x;
		this.y = y;
		this.frames = frames;
	}

	simulate(round : number) {
		const i = round % this.frames.length;
		this.frames[i].draw(this.display, this.x, this.y);
	}
}
