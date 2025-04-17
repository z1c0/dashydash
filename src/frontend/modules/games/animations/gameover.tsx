import { BaseAnimation } from './baseanimation';
import { getRandomBool } from '../../../common/misc';
import { Display } from '../core/display';
import { getRandomColor, getRandomGray } from '../core/color';

export class GameOver extends BaseAnimation {
	private useColors: boolean;
	private steps: number;
	private done: boolean;
	
	constructor(useColors: boolean) {
		super();
		this.useColors = useColors;
		this.steps = 0;
		this.done = false;
	}

	override render(display: Display) {
		for (let y = 0; y < Math.min(display.dimension(), this.steps); y++) {
			for (let x = 0; x < display.dimension(); x++) {
				if (this.useColors) {
					if (getRandomBool()) {
						display.setPixel(x, y, getRandomColor());
					}
				}
				else {
					display.setPixel(x, y, getRandomGray());
				}
			}
		}
		this.done = (this.steps++ >= display.dimension() * 2)
	}

	override isOver(): boolean {
		return this.done;
	}
}