import { createMatrix } from "../../../common/misc";
import { Color, Colors } from "./color";

export class Display {
	private world: Color[][];
	private clearColor: Color;

	constructor(dimension: number) {
		this.world = createMatrix(dimension);
		this.clearColor = Colors.Charcoal;
		this.clear();
	}

	dimension() {
		return this.world.length;
	}

	getPixel(x: number, y: number): Color {
		return this.world[x][y];
	}

	setPixel(x: number, y: number, color: Color) {
		this.world[x][y] = color;
	}

	clear(color: Color = this.getClearColor()) {
		this.clearColor = color;
		for (let i = 0; i < this.dimension(); i++) {
			for (let j = 0; j < this.dimension(); j++) {
				this.world[i][j] = color;
			}
		}
	}

	setFrameBuffer(frameBuffer: Color[][]) {
		for (let i = 0; i < this.dimension(); i++) {
			for (let j = 0; j < this.dimension(); j++) {
				this.setPixel(i, j, frameBuffer[i][j]);
			}
		}
	}

	getClearColor(): Color {
		return this.clearColor;
	}

	isClearColor(color: Color) {
		return this.clearColor === color;
	}

	inBounds(x: number, y: number){
		return x >= 0 && y >= 0 && x < this.dimension() && y < this.dimension();
	}

	captureFrameBuffer() {
		return this.world.map(function (arr) {
			return arr.slice();
		});
	};
}