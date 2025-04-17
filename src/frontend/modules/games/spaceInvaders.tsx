import { getRandom } from '../../common/misc';
import { BaseGame } from './core/baseGame';
import { Color, Colors } from './core/color';
import { Display } from './core/display';

const FLIP = 0;
const FLAP = 1;
const EXPLODING = 2;

class Invader {
	display: Display;
	invader1Sprites: number[][][];
	invader2Sprites: number[][][];
	invader3Sprites: number[][][];
	explosionSprite: number[][];
	x: number = 0;
	y: number = 0;
	dx: number = 0;
	delay: number = 0;
	state: number = 0;
	invaderIndex: number = 0;
	explodingDelay: number = 0;
	
	constructor(display: Display) {
		this.display = display;
		this.invader1Sprites = [
			[
				[0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
				[0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0 ],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
				[0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0 ],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
				[1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1 ],
				[1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1 ],
				[0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0 ],
			],
			[
				[0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
				[1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1 ],
				[1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1 ],
				[1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1 ],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
				[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
				[0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
				[0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
			],
		];
		this.invader2Sprites = [
			[
				[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0 ],
				[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
				[1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1 ],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
				[0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0 ],
				[0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0 ],
				[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
			],
			[
				[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0 ],
				[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
				[1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1 ],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
				[0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0 ],
				[0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0 ],
				[0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0 ],
			]
		];
		this.invader3Sprites = [
			[
				[0, 0, 0, 1, 1, 0, 0, 0 ],
				[0, 0, 1, 1, 1, 1, 0, 0 ],
				[0, 1, 1, 1, 1, 1, 1, 0 ],
				[1, 1, 0, 1, 1, 0, 1, 1 ],
				[1, 1, 1, 1, 1, 1, 1, 1 ],
				[0, 0, 1, 0, 0, 1, 0, 0 ],
				[0, 1, 0, 1, 1, 0, 1, 0 ],
				[1, 0, 1, 0, 0, 1, 0, 1 ],
			],
			[
				[0, 0, 0, 1, 1, 0, 0, 0 ],
				[0, 0, 1, 1, 1, 1, 0, 0 ],
				[0, 1, 1, 1, 1, 1, 1, 0 ],
				[1, 1, 0, 1, 1, 0, 1, 1 ],
				[1, 1, 1, 1, 1, 1, 1, 1 ],
				[0, 1, 0, 1, 1, 0, 1, 0 ],
				[1, 0, 0, 0, 0, 0, 0, 1 ],
				[0, 1, 0, 0, 0, 0, 1, 0 ],
			]
		];
		this.explosionSprite = [
			[0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0 ],
			[1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1 ],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
			[0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
			[1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1 ],
			[0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
			[1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1 ],
		];
		this.reset();
	}

	reset() {
		this.x = 0;
		this.y = 0;
		this.dx = 1;
		this.delay = 0;
		this.state = FLIP;
		this.invaderIndex = getRandom(0, 3);
	}

	getInvaderSprites() {
		switch (this.invaderIndex) {
			case 0:
				return this.invader1Sprites;

			case 1:
				return this.invader2Sprites;
				
			case 2:
				return this.invader3Sprites;

			default:
					throw "getInvaderSprites";
			}
	}

	move() {
		let s = this.getInvaderSprites();
		this.x += this.dx;
		if (this.x === 0 || this.x === this.display.dimension() - s[0][0].length) {
			this.dx *= -1;
			this.y += 2;
		}
	}

	simulate() {
		if (this.delay-- <= 0) {
			this.delay = 2;

			if (this.state === EXPLODING) {
				if (this.explodingDelay-- == 0) {
					this.reset();
				}
			}
			else if (this.state === FLIP) {
				this.state = FLAP;
				this.move();
			}
			else if (this.state === FLAP) {
				this.state = FLIP;
				this.move();
			}
		}
		this.draw();
	}

	draw() {
		let col = this.getInvaderColor();
		let s = this.explosionSprite;
		if (this.state === EXPLODING) {
			col = Colors.Yellow;
		}
		else {
			s = this.getInvaderSprites()[this.state];
		}
		for (let y = 0; y < s.length; y++) {
			for (let x = 0; x < s[y].length; x++) {
				const drawX = this.x + x;
				if (drawX < this.display.dimension() && s[y][x] === 1) {
					this.display.setPixel(drawX, this.y + y, col);
				}
			}
		}
	}

	getInvaderColor() : Color {
		switch (this.invaderIndex) {
			case 0:
				return Colors.NeonGreen;

			case 1:
				return Colors.Orange;

			case 2:
				return Colors.Turquoise;
		}	
		throw new Error("should not happen");
	}
}

class Defender {
	game: SpaceInvaders;
	x: number;
	y: number;
	move: number;
	delay: number;
	constructor(game: SpaceInvaders) {
		this.game = game;
		this.x = this.game.dim() / 2;
		this.y = this.game.dim() - 2;
		this.move = 0;
		this.delay = 0;
	}

	simulate() {
		if (this.delay-- <= 0) {
			this.delay = 2;
			if (this.move === 0) {
				this.move = getRandom(this.x * -1 + 1, this.game.dim() - 2 - this.x);
			}
			else if (this.move > 0) {
				this.x++;
				this.move--;
			}
			else {
				this.x--;
				this.move++;
			}

			if (!this.game.projectile.fired && this.game.invader.state !== EXPLODING && getRandom(0, 6) === 3) {
				this.game.projectile.fire(this.x, this.y);
			}
		}
		this.draw();
	}

	draw() {
		const col = Colors.White;
		this.game.display.setPixel(this.x, this.y, col);
		this.game.display.setPixel(this.x - 1, this.y + 1, col);
		this.game.display.setPixel(this.x + 0, this.y + 1, col);
		this.game.display.setPixel(this.x + 1, this.y + 1, col);
	}
}

class Projectile {
	game: SpaceInvaders;
	fired: boolean;
	x: number = 0;
	y: number = 0;
	constructor(game: SpaceInvaders) {
		this.game = game;
		this.fired = false;
	}

	fire(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.fired = true;
	}

	simulate() {
		if (this.fired) {
			if (this.y === 0) {
				this.fired = false;
			}
			else if (this.game.display.getPixel(this.x, this.y - 2) === this.game.invader.getInvaderColor()) {
				this.fired = false;
				this.game.invader.state = EXPLODING;
				this.game.invader.explodingDelay = 3;
			}
			else {
				this.y -= 2;
				this.draw();
			}
		}
	}

	draw() {
		const col = Colors.Red;
		this.game.display.setPixel(this.x, this.y - 1, col);
		this.game.display.setPixel(this.x, this.y, col);
	}
}


export class SpaceInvaders extends BaseGame {
	private defender: Defender;
	projectile: Projectile;
	invader: Invader;

	constructor(canvas: HTMLCanvasElement) {
		super(canvas)
		this.defender = new Defender(this);
		this.projectile = new Projectile(this);
		this.invader = new Invader(this.display);
	}
	
	getInterval() {
		return 90;
	}

	simulate() {
		this.display.clear(Colors.DarkSlateGray);
		this.defender.simulate();
		this.invader.simulate();
		this.projectile.simulate();
	}
}
