import { getRandom } from '../../common/misc';
import { BaseGame } from './core/baseGame';
import { Colors } from './core/color';
import { Frame, Sprite } from './core/sprite';

const _ = Colors.Charcoal;
const H = Colors.NeonGreen; // hair
const S = Colors.Peach;     // skin
const C = Colors.RoyalBlue; // clothes

function createLemming1() {
	const frame = [
		[_, _, _, _ , _, _ ],
		[H, H, H, H , _, _ ],
		[H, H, S, _ , _, _ ],
		[_, S, S, S , _, _ ],
		[_, S, C, _ , _, _ ],
		[_, S, C, _ , _, _ ],
		[_, S, C, _ , _, _ ],
		[_, C, C, _ , _, _ ],
		[S, C, C, _ , _, _ ],
		[_, S, S, _ , _, _ ],
	];
	return frame;
}
function createLemming2() {
	const frame = [
		[_, H, _, H, _, _ ],
		[H, H, H, _, _, _ ],
		[H, H, S, _, _, _ ],
		[_, S, S, S, _, _ ],
		[S, S, C, _, _, _ ],
		[S, C, C, _, _, _ ],
		[_, C, C, _, S, _ ],
		[_, C, C, _, S, _ ],
		[C, C, _, S, _, _ ],
		[S, S, _, _, _, _ ],
	];
	return frame;
}
function createLemming3() {
	const frame = [
		[_, _, _, _, _, _ ],
		[_, H, _, H, _, _ ],
		[_, H, H, H, _, _ ],
		[_, _, H, S, _, _ ],
		[_, _, S, S, S, _ ],
		[_, S, S, C, _, _ ],
		[_, S, C, C, _, _ ],
		[S, S, C, C, C, _ ],
		[_, C, C, C, C, _ ],
		[S, S, _, _, S, S ],
	];
	return frame;
}
function createLemming4() {
	const frame = [
		[_, _, _, _, _, _ ],
		[_, _, H, H, _, _ ],
		[_, H, H, S, H, _ ],
		[_, H, S, S, S, _ ],
		[_, _, S, C, _, _ ],
		[_, _, S, C, _, _ ],
		[_, S, C, C, _, _ ],
		[_, _, C, C, _, _ ],
		[S, C, C, C, C, _ ],
		[S, _, _, S, S, _ ],
	];
	return frame;
}
function createLemming5() {
	const frame = [
		[_, _, _, _, _, _ ],
		[H, H, H, H, _, _ ],
		[H, H, S, _, _, _ ],
		[H, S, S, S, _, _ ],
		[_, S, C, _, _, _ ],
		[_, C, S, _, _, _ ],
		[_, S, C, _, _, _ ],
		[_, C, C, _, _, _ ],
		[S, C, C, _, _, _ ],
		[_, S, S, _, _, _ ],
	];
	return frame;
}
function createLemming6() {
	const frame = [
		[_, H, _, H, _, _ ],
		[H, H, H, _, _, _ ],
		[H, H, S, _, _, _ ],
		[_, S, S, S, _, _ ],
		[_, S, C, _, _, _ ],
		[_, C, S, _, _, _ ],
		[_, C, S, _, S, _ ],
		[_, C, C, _, S, _ ],
		[C, C, _, S, _, _ ],
		[S, S, _, _, _, _ ],
	];
	return frame;
}
function createLemming7() {
	const frame = [
		[_, _, _, _, _, _ ],
		[_, H, _, H, _, _ ],
		[_, H, H, H, _, _ ],
		[_, _, H, S, _, _ ],
		[_, _, S, S, S, _ ],
		[_, _, C, S, _, _ ],
		[_, _, C, S, _, _ ],
		[_, _, C, C, S, _ ],
		[_, C, C, C, C, _ ],
		[S, S, _, _, S, S ],
	];
	return frame;
}
function createLemming8() {
	const frame = [
		[_, _, _, _, _, _ ],
		[_, _, H, H, _, _ ],
		[_, H, H, S, H, _ ],
		[_, H, S, S, S, _ ],
		[_, _, S, C, _, _ ],
		[_, _, S, C, _, _ ],
		[_, _, C, S, _, _ ],
		[_, _, C, C, _, _ ],
		[S, C, C, C, C, _ ],
		[S, _, _, S, S, _ ],
	];
	return frame;
}

export class Lemmings extends BaseGame {
	private sprite: Sprite;

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.sprite = new Sprite(this.display, -5, 1, [
			new Frame(createLemming1()),
			new Frame(createLemming2()),
			new Frame(createLemming3()),
			new Frame(createLemming4()),
			new Frame(createLemming5()),
			new Frame(createLemming6()),
			new Frame(createLemming7()),
			new Frame(createLemming8()),
		]);
	}
	
	override getInterval() {
		return 90;
	}

	override simulate() {
		this.display.clear(Colors.Charcoal);
		this.sprite.simulate(this.frame());
		this.sprite.x++;
		if (this.sprite.x > this.dim()) {
			this.sprite.x = -5;
			this.sprite.y = getRandom(1, this.dim() - 10);
		}
	}
}
