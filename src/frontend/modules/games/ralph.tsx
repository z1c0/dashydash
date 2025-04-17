import { BaseGame } from './core/baseGame';
import { Colors } from './core/color';
import { Frame, Sprite } from './core/sprite';

const _ = Colors.Charcoal;
const W = Colors.White;
const R = Colors.Crimson;  // hair
const L = Colors.LightPink; // skin light
const B = Colors.Black;
const D = Colors.RosyBrown; // skin dark
const N = Colors.IndianRed; // nose
const O = Colors.Brown; // eyebrows

function createRalph1() {
	const frame = [
		[_, _, _, R, R, _, _, R, R, _, _, R, R, _, _ ],
		[_, _, _, _, R, R, R, R, R, _, R, R, _, _, _ ],
		[_, R, R, R, R, R, R, R, R, R, R, R, R, R, _ ],
		[_, _, R, R, R, R, R, R, R, R, R, R, R, R, _ ],
		[R, R, R, R, R, R, R, R, R, R, R, R, R, R, R ],
		[_, R, R, R, R, L, L, L, L, L, R, R, R, R, _ ],
		[_, _, R, R, D, O, L, L, L, O, D, R, R, _, _ ],
		[_, R, R, R, D, D, O, D, O, D, D, R, R, R, _ ],
		[R, D, D, R, D, W, W, D, W, W, D, R, D, D, R ],
		[_, L, D, R, L, W, B, L, B, W, L, R, D, L, _ ],
		[_, L, L, R, L, L, N, N, N, L, L, R, L, L, _ ],
		[_, _, O, L, L, L, N, N, N, L, L, L, O, _, _ ],
		[_, _, D, L, L, L, L, L, L, L, L, L, D, _, _ ],
		[_, _, L, L, B, W, W, W, W, W, B, L, L, _, _ ],
		[_, _, L, B, B, B, B, B, B, B, B, B, L, _, _ ],
		[_, _, L, B, D, B, O, O, O, B, D, B, L, _, _ ],
		[_, _, L, B, O, W, W, W, W, W, O, B, L, _, _ ],
		[_, _, _, L, L, L, L, L, L, L, L, L, _, _, _ ],
		[_, _, _, _, L, L, L, L, L, L, L, _, _, _, _ ],
	];
	return frame;
}

function createRalph2() {	
	const frame = [
		[_, _, _, R, R, _, _, R, R, _, R, R, _, _, _ ],
		[_, _, _, R, R, R, R, R, R, _, R, R, _, _, _ ],
		[_, R, R, R, R, R, R, R, R, R, R, R, R, R, _ ],
		[_, _, R, R, R, R, R, R, R, R, R, R, R, R, _ ],
		[R, R, R, R, R, R, R, R, R, R, R, R, R, R, R ],
		[_, R, R, R, R, L, L, L, L, L, R, R, R, R, _ ],
		[_, _, R, R, D, O, O, L, O, O, D, R, R, _, _ ],
		[_, R, R, R, D, D, D, D, D, D, D, R, R, R, _ ],
		[R, D, D, R, D, W, B, D, W, B, D, R, D, D, R ],
		[_, L, D, R, L, W, W, L, W, W, L, R, D, L, _ ],
		[_, L, L, R, L, L, N, N, N, L, L, R, L, L, _ ],
		[_, _, O, L, L, L, N, N, N, L, L, L, O, _, _ ],
		[_, _, D, L, L, L, L, L, L, L, L, L, D, _, _ ],
		[_, _, L, L, L, L, L, L, L, L, L, L, L, _, _ ],
		[_, _, L, O, L, L, L, L, L, L, L, O, L, _, _ ],
		[_, _, L, O, O, O, O, O, O, O, O, O, L, _, _ ],
		[_, _, L, L, L, L, L, L, L, L, L, L, L, _, _ ],
		[_, _, _, L, L, L, L, L, L, L, L, L, _, _, _ ],
		[_, _, _, _, L, L, L, L, L, L, L, _, _, _, _ ],
	];
	return frame;
}

export class Ralph extends BaseGame {
	private sprite: Sprite;

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.sprite = new Sprite(this.display, 8, 6, [
			new Frame(createRalph1()),
			new Frame(createRalph2()),
		]);
	}
	
	override getInterval() {
		return 750;
	}

	override simulate() {
		this.sprite.simulate(this.frame());
	}
}
