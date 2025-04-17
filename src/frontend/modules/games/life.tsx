import { getRandomElement } from "../../common/misc";
import { BaseGame } from "./core/baseGame";
import { Color, Colors, generateShades, getRandomColor } from "./core/color";

export class Life extends BaseGame {
	private grid: number[][];
	colors: Color[];

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.colors = generateShades(getRandomColor());
		this.grid = this.createRandomGrid();
	}

	private createRandomGrid(): number[][] {
		return Array.from({ length: this.dim() }, () => 
			Array.from({ length: this.dim() }, () => Math.random() < 0.5 ? 1 : 0)
		);
	}

	override getInterval() {
		return 400;
	}

	override simulate() {
		const newGrid = Array.from({ length: this.dim() }, () => Array(this.dim()).fill(0));

		for (let row = 0; row < this.dim(); row++) {
			for (let col = 0; col < this.dim(); col++) {
				const alive = this.grid[row][col] === 1;
				const neighbors = this.countNeighbors(row, col);

				if (alive && (neighbors === 2 || neighbors === 3)) {
					newGrid[row][col] = 1;
				} else if (!alive && neighbors === 3) {
					newGrid[row][col] = 1;
				}
			}
		}
		this.grid = newGrid;

		this.grid.forEach((col, x) => { 
			col.forEach((cell, y) => { 
				const color = (() => cell === 1 ? getRandomElement(this.colors) : Colors.Charcoal)();
				this.display.setPixel(x, y, color);
			});
		});
	}

	private countNeighbors(row: number, col: number): number {
		let count = 0;
		for (let dr = -1; dr <= 1; dr++) {
			for (let dc = -1; dc <= 1; dc++) {
				if (dr === 0 && dc === 0) continue;
				const r = row + dr;
				const c = col + dc;
				if (r >= 0 && r < this.dim() && c >= 0 && c < this.dim()) {
					count += this.grid[r][c];
				}
			}
		}
		return count;
	}
}
