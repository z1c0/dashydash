import { BaseGame } from './core/baseGame';
import { Cursor, getRandom, randomBoolean } from '../../common/misc';
import { Color, Colors } from './core/color';

export class Tetris extends BaseGame {
	round: number = 0;
	pieces: Cursor<number[][]>;
	moves: Cursor<boolean>;
	piece: number[][] | null = null;
	x: number = 0;
	y: number = 0;
	
	constructor(canvas: HTMLCanvasElement) {
		super(canvas);

		this.pieces = new Cursor([
			[
				[ 0, 2, 0 ],
				[ 2, 2, 2 ],
				[ 0, 2, 0 ]
			],
			[ [ 1, 1, 1, 1 ] ],
			[
				[ 0, 0, 3 ],
				[ 0, 0, 3 ],
				[ 3, 3, 3 ]
			],
			[
				[ 4 ],
				[ 4 ],
				[ 4 ],
				[ 4 ],
			],
			[
				[ 5, 5 ],
				[ 5, 5 ],
			]
		]);
		let moves : boolean[] = [];
		for (let i = 0; i < 100; i++) {
			var b = randomBoolean();
			moves = moves.concat(Array.from({length: getRandom(1, 5)}, () => b));
		}
		this.moves = new Cursor(moves);
		this.piece = null;
		this.round = 0;
	}

	override getInterval() {
		return 400;
	} 

	check(dx: number, dy: number) {
		if (!this.piece) {
			return false;
		}
		const h = this.piece.length;
		const w = this.piece[0].length;
		const px = this.x + dx;
		const py = this.y + dy;
		if (px < 0 || px + w > this.dim() || py < 0) {
			return false;
		}	
		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++)	{
				if (this.piece[y][x] != 0 && this.display.getPixel(x + px, y + py) != this.display.getClearColor())	{
					return false;
				}
			}
		}
		return true;
	}

	put(clear: boolean)	{
		if (!this.piece) {
			return;
		}
		const h = this.piece.length;
		const w = this.piece[0].length;
		for (var y = 0; y < h; y++)
		{
			for (var x = 0; x < w; x++)
			{
				const c = this.piece[y][x];
				if (c != 0)	{
					this.display.setPixel(
						x + this.x,
						y + this.y,
						clear ? this.display.getClearColor() : this.toColor(c)
					);
				}
			}
		}
	}

	override simulate() {
		if (!this.piece) {
			this.piece = this.pieces.next();
			this.y = 0;
			this.x = this.dim() / 2 + getRandom(-7, 7);
		}

		const m = this.moves.next();

		this.put(true)
	
		const dx = m ? -1 : 1;
		let changed = false;
		if (this.check(dx, 0)) {
			this.x += dx;
		}
		if (this.check(0, 1)){
			this.y++;
			changed = true;
		}
		this.put(false);

		if (!changed) {
			this.piece = null;
			this.round++;
		}
	}

	toColor(pixel: number): Color {
		if (pixel == 1) {
			return Colors.BrightRed;
		}
		else if (pixel == 2) {
			return Colors.LimeYellow;
		}
		else if (pixel == 3) {
			return Colors.SkyBlue;
		}
		else if (pixel == 4) {
			return Colors.HotPink;
		}
		else if (pixel == 5) {
			return Colors.NeonYellow;
		}
    return Colors.Black;
  }
}

