import { BaseAnimation } from './baseanimation';
import { getRandom, getRandomElement } from '../../../common/misc';
import { Display } from '../core/display';
import { Color, Colors } from '../core/color';

const MAX_ROUNDS = 300;

const whites = [
	[200, 200, 200],
	[255, 255, 255],
	[225, 225, 225],
];

const greens = [
	[124, 252,   0],
	[127, 255,   0],
	[ 50, 205,  50],
	[  0, 255,   0],
	[ 34, 139,  34],
	[  0, 128,   0],
	[  0, 100,   0],
];

type Column = {
	active: boolean;
	y: number;
	length: number;
}
export class Matrix extends BaseAnimation {
	rounds: number;
	columns: Column[];

	constructor(dimension: number) {
		super();
		this.columns = [];
		for (let i = 0; i < dimension; i++) {
			this.columns.push({ active : true, y : -1 * getRandom(0, dimension), length : getRandom(8, dimension) });
		}
		this.rounds = 0;
	}

	override isOver() {
		return this.rounds++ === MAX_ROUNDS;
	}

	override render(display: Display) {
		// wake up strands
		for (let i = 0; i < 3; i++) {
			let col = getRandomElement(this.columns);
			if (!col.active) {
				col.active = true;
				col.y = 0;
				col.length = getRandom(8, display.dimension());
			}
		}

		for (let x = 0; x < this.columns.length; x++) {
			let col = this.columns[x];
			if (col.active) {
				for (let y = col.y; y >= 0; y--) {
					let color = Colors.Black;
					if (y === col.y) {
						const c = getRandomElement(whites);
						color = Color(c[0], c[1], c[2]);
					} 
					else if ((col.y - y) < col.length) {
						const c = getRandomElement(greens);
						color = Color(c[0], c[1], c[2]);
					}
					// draw pixel
					if (y < display.dimension()) {
						display.setPixel(x, y, color);
					}
				}
				col.y++;

				// out of visible area?
				if (col.y - col.length > display.dimension()) {
					col.active = false;
				}
			}
		}
	}
};
