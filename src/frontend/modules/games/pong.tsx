import { getRandom } from '../../common/misc';
import { BaseGame } from './core/baseGame';
import { Colors } from './core/color';

const BALL_COLOR = Colors.Yellow;
const PADDLE_COLOR = Colors.WhiteSmoke;

class Ball {
	game: Pong;
	max: number;
	dx: number;
	dy: number;
	x: number;
	y: number;
	
	constructor(game: Pong) {
		this.game = game;
		this.max = this.game.dim() - 1;
		this.dx = 1;
		this.dy = 1;
		this.x = this.game.paddle1.x + 2;
		this.y = this.game.paddle1.y;
	}

	simulate() {
		if (this.x <= 1 || this.x >= this.max - 1) {
			this.dx *= -1;
		}
		if (this.y === 0 || this.y === this.max) {
			this.dy *= -1;
		}
		this.x += this.dx;
		this.y += this.dy;

		this.game.display.setPixel(this.x, this.y, BALL_COLOR);
	}
}

class Paddle {
	playerOne: boolean;
	game: Pong;
	x: number;
	y: number;
	
	constructor(playerOne: boolean, game: Pong) {
		this.playerOne = playerOne;
		this.game = game;
		this.x = this.playerOne ? 0 : this.game.dim() - 1;
		this.y = getRandom(2, this.game.dim() - 3);
	}

	simulate() {
		if (this.playerOne && this.game.ball.dx === -1 || !this.playerOne && this.game.ball.dx === 1) {
			if (this.y > this.game.ball.y) {
				this.y--;
			}
			else if (this.y < this.game.ball.y) {
				this.y++;
			}
		}
		this.draw();
	}

	draw() {
		this.game.display.setPixel(this.x, this.y - 2, PADDLE_COLOR);
		this.game.display.setPixel(this.x, this.y - 1, PADDLE_COLOR);
		this.game.display.setPixel(this.x, this.y, PADDLE_COLOR);
		this.game.display.setPixel(this.x, this.y + 1, PADDLE_COLOR);
		this.game.display.setPixel(this.x, this.y + 2, PADDLE_COLOR);
	}
}

export class Pong extends BaseGame {
	paddle1: Paddle;
	paddle2: Paddle;
	ball: Ball;

	constructor(canvas: HTMLCanvasElement) {
		super(canvas)
		this.paddle1 = new Paddle(true, this);
		this.paddle2 = new Paddle(false, this);
		this.ball = new Ball(this);
	}
	
	override getInterval() {
		return 100;
	}

	override simulate() {
		this.display.clear(Colors.DarkGreen);
		const dim = this.dim();
		for (var i = 0; i < dim; i++) {
			this.display.setPixel(dim / 2 - i % 2, i, Colors.White);
		}
		this.ball.simulate();
		this.paddle1.simulate();
		this.paddle2.simulate();
	}
}

