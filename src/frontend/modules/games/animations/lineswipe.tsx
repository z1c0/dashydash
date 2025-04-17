import { Color, Colors, getRandomColor } from '../core/color';
import { Display } from '../core/display';
import { BaseAnimation } from './baseanimation';

export class LineSwipe extends BaseAnimation {
	x: number = 0;
	color!: Color;
	goBack: boolean = false;

	constructor() {
		super();
		this.x = -1
		this.goBack = false;
		this.color = getRandomColor()
	}

	override render(display: Display) {
		const dim = display.dimension();
		for (let y = 0; y < dim; y++) {
			if (display.inBounds(this.x, y)) {
				display.setPixel(this.x, y, Colors.Charcoal);
			}
		}
		this.x = this.x + (this.goBack ? -1 : 1);
		for (let y = 0; y < dim; y++) {
			if (display.inBounds(this.x, y)) {
				display.setPixel(this.x, y, this.color);
			}
		}
		if (this.x >= dim) {
			this.goBack = true;
		}
	}

	override isOver(): boolean {
		return this.goBack && this.x < 0;
	}
}
