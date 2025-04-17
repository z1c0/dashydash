import { getRandomBool } from '../../common/misc';
import { BaseGame } from './core/baseGame';
import { Color, Colors } from './core/color';

function createGhostFrame(M: Color, flip: boolean) {
	const _ = Colors.Charcoal;
	const o = Colors.White;
	const X = Colors.DeepBlue;
	const frame = [
		[_, _, _, _, _, M, M, M, M, _, _, _, _, _ ],
		[_, _, _, M, M, M, M, M, M, M, M, _, _, _ ],
		[_, _, M, M, M, M, M, M, M, M, M, M, _, _ ],
		[_, M, M, M, o, o, M, M, M, M, o, o, M, _ ],
		[_, M, M, o, o, o, o, M, M, o, o, o, o, _ ],
		[_, M, M, o, o, X, X, M, M, o, o, X, X, _ ],
		[M, M, M, o, o, X, X, M, M, o, o, X, X, M ],
		[M, M, M, M, o, o, M, M, M, M, o, o, M, M ],
		[M, M, M, M, M, M, M, M, M, M, M, M, M, M ],
		[M, M, M, M, M, M, M, M, M, M, M, M, M, M ],
		[M, M, M, M, M, M, M, M, M, M, M, M, M, M ],
		[M, M, M, M, M, M, M, M, M, M, M, M, M, M ],
		[M, M, M, M, M, M, M, M, M, M, M, M, M, M ],
		[M, M, M, M, M, M, M, M, M, M, M, M, M, M ],
		[M, M, M, M, _, M, M, M, M, _, M, M, M, M ],
		[_, M, M, _, _, _, M, M, _, _, _, M, M, _ ],
	];
	if (flip) {
		frame.forEach(l => l.reverse());
	}
	return frame;
}

class Ghost {
	game: BaseGame;
	x: number;
	y: number;
	frame: number;
	sprites: Color[][][];
	
	constructor(game: BaseGame, color: Color, x: number, y: number) {
		this.game = game;
		this.x = x;
		this.y = y;
		this.frame = x > 1 ? 0 : 1;
		this.sprites = [
			createGhostFrame(color, false),
			createGhostFrame(color, true)
		];
	}

	simulate() {
		this.draw();
	}

	draw() {
		let s = this.sprites[this.frame];
		for (var y = 0; y < s.length; y++) {
			for (var x = 0; x < s[y].length; x++) {
				let c = s[y][x];
				if (c) {
					this.game.display.setPixel(this.x + x, this.y + y, c);
				}
			}
		}
		this.frame = (this.frame + 1) % this.sprites.length;
	}
}

export class PacMan extends BaseGame {
	private sprites: Ghost[];

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.sprites = [
			new Ghost(this, getRandomBool() ? Colors.FieryRed : Colors.WarmOrange, 1 , 1),
			new Ghost(this, getRandomBool() ? Colors.NeonCyan : Colors.PastelPink, 15, 15),
		];
	}

	override getInterval() {
		return 750;
	}	

	simulate() {
		this.sprites.forEach(s => {
			s.simulate();
		});
	}
}
