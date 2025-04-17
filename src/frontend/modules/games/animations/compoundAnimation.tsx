import { Display } from '../core/display';
import { BaseAnimation } from './baseanimation';

export class CompoundAnimation extends BaseAnimation {
	animation1: BaseAnimation;
	animation2: BaseAnimation;
	renderFirst: boolean;

	constructor(animation1: BaseAnimation, animation2: BaseAnimation) {
		super();
		this.animation1 = animation1;
		this.animation2 = animation2;
		this.renderFirst = true;
	}

	override render(display: Display) {
		if (this.renderFirst) {
			this.animation1.render(display);
			if (this.animation1.isOver()) {
				this.renderFirst = false;
			}
		} else {
			this.animation2.render(display);
		}
	}

	override isOver(): boolean {
		return this.animation2.isOver();
	}
}
