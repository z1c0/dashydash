import { BaseGame } from './core/baseGame';
import { getRandom, shuffle } from '../../common/misc';
import { Color, Colors } from './core/color';

const CLEAR_COLOR = Colors.Charcoal;
const BALL_COLOR = Colors.White;

class Ball {
	game: Arkanoid;
	max: number;
	dx: number;
	dy: number;
	x: number;
	y: number;
	
	constructor(game: Arkanoid, x: number) {
		this.game = game;
		this.max = this.game.dim() - 1;
		this.dx = 1;
		this.dy = 1;
		this.x = x;
		this.y = this.max;
	}

	simulate() {
		if (this.x === 0 || this.x === this.max) {
			this.dx *= -1;
		}
		if (this.y === 0 || (this.dy === 1 && this.y === this.max - 1)) {
			this.dy *= -1;
		}
		this.game.display.setPixel(this.x, this.y, CLEAR_COLOR);

		this.x += this.dx;
		this.y += this.dy;

		if (this.game.display.getPixel(this.x, this.y) != CLEAR_COLOR) {
			this.game.display.setPixel(this.x, this.y, CLEAR_COLOR);
			this.game.display.setPixel(Math.max(0, this.x - 1), this.y, CLEAR_COLOR);
			this.game.display.setPixel(Math.min(this.game.dim() - 1, this.x + 1), this.y, CLEAR_COLOR);
			this.dy *= -1;
			this.y += this.dy;
		}
		this.game.display.setPixel(this.x, this.y, BALL_COLOR);
	}
}

class Ship {
	game: Arkanoid;
	x: number;
	y: number;

	constructor(game: Arkanoid, x: number) {
		this.game = game;
		this.x = x;
		this.y = this.game.dim() - 1;
	}

	simulate() {
		this.draw(true);
		if (this.x > this.game.ball.x) {
			this.x = Math.max(2, this.x - 1);
		}
		else if (this.x < this.game.ball.x) {
			this.x = Math.min(this.game.dim() - 3, this.x + 1);
		}    
		this.draw(false);
	}

	draw(clear: boolean) {
		const shipColor1 = clear ? CLEAR_COLOR : Colors.LightGray;
		const shipColor2 = clear ? CLEAR_COLOR : Colors.SlateGray;
		this.game.display.setPixel(this.x - 2, this.y, shipColor1);
		this.game.display.setPixel(this.x - 1, this.y, shipColor2);
		this.game.display.setPixel(this.x    , this.y, shipColor2);
		this.game.display.setPixel(this.x + 1, this.y, shipColor2);
		this.game.display.setPixel(this.x + 2, this.y, shipColor1);
	}
}

export class Arkanoid extends BaseGame {
	ball: Ball;
	ship: Ship;

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		const x = Math.floor(this.dim() / 2) - getRandom(-4, 4);
		this.ball = new Ball(this, x);
		this.ship = new Ship(this, x);
		this.display.clear(CLEAR_COLOR);

		const startColors = [
			Color(getRandom(150, 255), 0, 0),
			Color(0, getRandom(150, 255), 0),
			Color(0, 0, getRandom(150, 255)),
			Color(getRandom(150, 255), 0, getRandom(150, 255)),
			Color(getRandom(150, 255), getRandom(150, 255), 0),
			Color(0, getRandom(150, 255), getRandom(150, 255)),
		];
		shuffle(startColors);

		this.drawRect(0, 0, this.dim() - 1, 12, startColors[0], startColors[1], startColors[2], startColors[3]);
	}

	override getInterval() {
		return 100;
	}

	combine(rgb1: Color, rgb2: Color) {
		return Color(
			Math.floor((rgb1.r + rgb2.r) / 2),
			Math.floor((rgb1.g + rgb2.g) / 2),
			Math.floor((rgb1.b + rgb2.b) / 2)
		);
	}

	drawRect(x1: number, y1: number, x2: number, y2: number, rgb1: Color, rgb2: Color, rgb3: Color, rgb4: Color) {
		this.display.setPixel(x1, y1, rgb1);
		this.display.setPixel(x2, y1, rgb2);
		this.display.setPixel(x1, y2, rgb3);
		this.display.setPixel(x2, y2, rgb4);
		
		const w = Math.floor((x2 - x1) / 2);
		const h = Math.floor((y2 - y1) / 2);
		if (w === 0 && h === 0) {
		}
		else {
			const rgb_12 = this.combine(rgb1, rgb2);
			const rgb_13 = this.combine(rgb1, rgb3);
			const rgb_24 = this.combine(rgb2, rgb4);
			const rgb_34 = this.combine(rgb3, rgb4);
			const rgb_12_34 = this.combine(rgb_12, rgb_34);
			this.drawRect(x1    , y1    , x1 + w, y1 + h, rgb1, rgb_12, rgb_13, rgb_12_34);
			this.drawRect(x1 + w, y1    , x2    , y1 + h, rgb_12, rgb2, rgb_12_34, rgb_24);
			this.drawRect(x1    , y1 + h, x1 + w, y2    , rgb_13, rgb_12_34, rgb3, rgb_34);
			this.drawRect(x1 + w, y1 + h, x2    , y2    , rgb_12_34, rgb_24, rgb_34, rgb4);
		}
	}
	
	override simulate() {
		this.ball.simulate();
		this.ship.simulate();
	}
}
