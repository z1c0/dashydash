import { BaseAnimation } from './baseanimation';
import { Flake } from './flake';
import { Display } from '../core/display';
import { Color } from '../core/color';

const snowColors = [
	{ r: 0xE6, g: 0xE6, b: 0xE6 }, // #E6E6E6
	{ r: 0xD9, g: 0xD9, b: 0xD9 }, // #D9D9D9
	{ r: 0xB3, g: 0xB3, b: 0xB3 }, // #B3B3B3
	{ r: 0x99, g: 0x99, b: 0x99 }, // #999999
	{ r: 0x80, g: 0x80, b: 0x80 }, // #808080
]

export class Snow extends BaseAnimation {
	lastGameFrameBuffer: Color[][] | null;
	flakes: Flake[];
	startTime: number;

	constructor() {
		super();
		const NR_OF_FLAKES = 200;
		this.lastGameFrameBuffer = null;
		this.flakes = [];
		for (let i = 0; i < NR_OF_FLAKES; i++) {
			this.flakes.push(new Flake(snowColors));
		}
		this.startTime = performance.now();
	}
	
	override isOver() {
		return (performance.now() - this.startTime) > 1000 * 60;
	}

	override render(display: Display) {
		if (!this.lastGameFrameBuffer) {
			this.lastGameFrameBuffer = display.captureFrameBuffer();
		}
		display.setFrameBuffer(this.lastGameFrameBuffer);
		this.flakes.forEach(f => {
			f.simulate(display.dimension());
			f.render(display);
		});
	}
};
