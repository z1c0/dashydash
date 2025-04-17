import { BaseAnimation } from './baseanimation';
import { Flake } from './flake';
import { Display } from '../core/display';
import { Color } from '../core/color';

const ashColors = [
	{ r: 0x55, g: 0x55, b: 0x55 },
	{ r: 0x66, g: 0x66, b: 0x66 },
	{ r: 0x77, g: 0x77, b: 0x77 },
	{ r: 0x88, g: 0x88, b: 0x88 },
];

export class Thanos extends BaseAnimation {
	lastGameFrameBuffer: Color[][] | null;
	flakes: Flake[];
	startTime: number;
	
	constructor() {
		super();
		this.lastGameFrameBuffer = null;
		this.flakes = [];
		this.startTime = performance.now();
	}

	override isOver() {
		return this.flakes.every(f => f.isDead());
	}

	override render(display: Display) {
		if (!this.lastGameFrameBuffer) {
			this.lastGameFrameBuffer = display.captureFrameBuffer();
			for (let i = 0; i < display.dimension(); i++) {
				for (let j = 0; j < display.dimension(); j++) {
					let col = this.lastGameFrameBuffer[i][j];
					if (!display.isClearColor(col)) {
						const flake = new Flake(ashColors);
						flake.spawn(i, j);
						flake._canRespawn = false;
						this.flakes.push(flake);
					}
				}
			}
		}

		display.clear();

		this.flakes.forEach(f => {
			f.simulate(display.dimension());
			f.render(display);
		});
	}
};
