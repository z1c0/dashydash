import { darken } from '../core/color';
import { Display } from '../core/display';
import { BaseAnimation } from './baseanimation';

export class Darken extends BaseAnimation {
	blackCount: number = 0;

	override render(display : Display) {
		const dim = display.dimension();
		const darkStep = 8;
		this.blackCount = dim * dim;
		for (let i = 0; i < dim; i++) {
			for (let j = 0; j < dim; j++) {
				const color = darken(display.getPixel(i, j), darkStep);
				display.setPixel(i, j, color);
				if (color.r == 0 && color.b == 0 && color.b == 0) {
					this.blackCount--;
				}
			}
		}
	}

	override isOver(): boolean {
		// all black?
		return this.blackCount <= 0;
	}
}
