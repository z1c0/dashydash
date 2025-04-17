import { getRandomElement, randomIntFromInterval, randomBoolean, getRandom } from '../../../common/misc';
import { Color } from '../core/color';
import { Display } from '../core/display';

export class Flake {
	_x: number;
	_y: number;
	_alive: boolean;
	_canRespawn: boolean;
	_color: Color;
	_xMomentum: number = 0;
	_speed: number = 0;
	_sign: number = 0;
	_counter: number = 0;
	
	constructor(colors: Color[]) {
		this._x = 0;
		this._y = 0;
		this._alive = false;
		this._color = getRandomElement(colors);
		this._canRespawn = true;
	}

	isDead() {
		return !this._alive;
	}

	spawn(x: number, y: number) {
		this._x = x;
		this._y = y;
		this._alive = true;
		this._speed = randomIntFromInterval(2, 10);
		this._sign = randomBoolean() ? 1 : -1;
		this._counter = 0;
	}

	simulate(dimension: number) {
		if (!this._alive) {
			if (this._canRespawn && Math.random() > 0.995) {
				this.spawn(getRandom(0, dimension), -1 * getRandom(0, 10));
			}
		}
		else {
			this._counter += this._speed / 4000.;
			this._x += this._sign * this._speed * Math.cos(this._counter) / 40;
			this._y += Math.sin(this._counter) / 40 + this._speed / 30;
		}
	}

	render(display: Display) {
		const x = Math.round(this._x);
		const y = Math.round(this._y);
		if (this._alive && y >= 0) {
			if (y < display.dimension()) {
				if (x >= 0 && x < display.dimension()) {
					display.setPixel(x, y, this._color);
				}
			}
			else {
				this._alive = false;
			}
		}
	}
};
