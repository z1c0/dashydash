import { Display } from './display';
import { Color } from './color';

export abstract class BaseGame {
	display: Display;
	private _frame: number;
	private canvas: HTMLCanvasElement;
	private step: number = 0;
	private offsetX: number = 0;
	private offsetY: number = 0;
	private ctx!: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement, dim: number = 32) {
		this.canvas = canvas;
		this.display = new Display(dim);
		this._frame = 0;
		this.step = Math.floor(canvas.width / dim);
		this.offsetX = Math.round((canvas.width - this.step * dim) / 2);
		this.offsetY = Math.round((canvas.height - this.step * dim) / 2);
		this.ctx = canvas.getContext('2d')!;
	}

	private writePixel(x: number, y: number, color: Color) {
		const c = `rgb(${color.r},${color.g},${color.b})`;
		this.ctx.fillStyle = c;
		this.ctx.fillRect(x * this.step + 1 + this.offsetX, y * this.step + 1 + this.offsetY, this.step - 2, this.step - 2);
	}

	render() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (let y = 0; y < this.dim(); y++) {
			for (let x = 0; x < this.dim(); x++) {
				this.writePixel(x, y, this.display.getPixel(x, y));
			}
		}
		this._frame++;
	}

	dim(): number {
		return this.display.dimension();
	}

	frame(): number {
		return this._frame;
	}

	abstract getInterval(): number;

	abstract simulate(): void;
}