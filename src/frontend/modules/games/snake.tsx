import { createMatrix, getRandom, shuffle } from '../../common/misc';
import { BaseGame } from './core/baseGame';
import { Colors } from './core/color';

const VOID        =  0;
const SNAKE_UP    =  1;
const SNAKE_DOWN  =  2;
const SNAKE_LEFT  =  3;
const SNAKE_RIGHT =  4;
const FOOD        =  5;
const WALL        =  6;

export class Snake extends BaseGame {
	private field: number[][];
	private tail: [number, number];
	private head: [number, number];
	private food: [number, number];
	private grow: number;
	
	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.field = createMatrix(this.dim())
		this.tail = [0, 0];
		this.head = [0, 0];
		this.food = [0, 0];
		this.grow = 0;

		this.reset();
	}

	override getInterval() {
		return 100;
	}

	reset() {
		// walls
		const dim = this.display.dimension();
		for (var i = 0; i < dim; i++) {
			for (var j = 0; j < dim; j++) {
				let cell = VOID;
				if (i == 0 || j == 0 || i == dim - 1 || j == dim - 1) {
					cell = WALL;
				}
				this.setCellValue([i, j], cell);
			}
		}
		// snake
		let x = getRandom(5, dim - 10);
		const y = getRandom(2, dim - 2);
		this.tail[0] = x; 
		this.tail[1] = y;
		this.setCellValue([x, y], SNAKE_RIGHT);
		x++;
		this.setCellValue([x, y], SNAKE_RIGHT);
		x++;
		this.setCellValue([x, y], SNAKE_RIGHT);
		this.head[0] = x;
		this.head[1] = y;
		// food
		this.food = this.getRandomPos();
		this.setCellValue(this.food, FOOD);
	}
	
	checkMove(cell: [number, number], dir: number) {
		const tmp: [number, number] = [...cell];
		this.setCellValue(tmp, dir);
		var v = this.getCellValue(this.moveCell(tmp));
		return (v == VOID || v == FOOD);
	}
	
	override simulate() {
		let dir = this.getCellValue(this.head);
		// steer to food
		const dx = this.food[0] - this.head[0];
		const dy = this.food[1] - this.head[1];
		if (dx != 0) {
			if (dir == SNAKE_UP || dir == SNAKE_DOWN) {
				dir = (dx < 0) ? SNAKE_LEFT : SNAKE_RIGHT;
			} 
		}
		if (dy != 0) {
			if (dir == SNAKE_LEFT || dir == SNAKE_RIGHT) {
				dir = (dy < 0) ? SNAKE_UP : SNAKE_DOWN;
			}
		}
		this.setCellValue(this.head, dir);
		
		// check
		dir = this.getCellValue(this.head);
		if (!this.checkMove(this.head, dir)) {
			var o = [];
			if (dir == SNAKE_UP || dir == SNAKE_DOWN) {
				o = shuffle([SNAKE_LEFT, SNAKE_RIGHT]);
			} 
			else {
				o = shuffle([SNAKE_UP, SNAKE_DOWN]);
			}
			if (!this.checkMove(this.head, o[0])) {
				this.checkMove(this.head, o[1]);
			}
		}
		
		// move
		this.move();

		this.field.forEach((col, x) => { 
			col.forEach((cell, y) => { 
				const color = (() => {
					switch (cell) {
						case SNAKE_UP:
						case SNAKE_DOWN:
						case SNAKE_LEFT:
						case SNAKE_RIGHT:
							return Colors.LeafGreen;
						case FOOD:
							return Colors.BurntCoral;
						case WALL:
							return Colors.RoyalBlue;
						default:
							return Colors.Charcoal;
						}
				})();
				this.display.setPixel(x, y, color);
			});
		});
	}
	
	getCellValue(cell: [number, number]): number {
		return this.field[cell[0]][cell[1]];
	}
	
	setCellValue(cell: number[], value: number) {
		this.field[cell[0]][cell[1]] = value;
	}
	
	moveCell(cell: [number, number]) {
		const dir = this.getCellValue(cell);
		switch (dir) {
			case SNAKE_UP:
				cell[1]--;
				break;
			case SNAKE_DOWN:
				cell[1]++;
				break;
			case SNAKE_LEFT:
				cell[0]--;
				break;
			case SNAKE_RIGHT:
				cell[0]++;
				break;
		}
		return cell;
	}
	
	move() {
		if (this.grow == 0) {
			// move tail
			var oldTail = this.tail.slice();
			this.moveCell(this.tail);
			this.setCellValue(oldTail, VOID);
		}
		else {
			this.grow--;
		}
		// move head
		var vOld = this.getCellValue(this.head);
		this.moveCell(this.head);
		var v = this.getCellValue(this.head);
		switch(v) {
			case FOOD:
				this.food = this.getRandomPos();
				this.setCellValue(this.food, FOOD);
				this.grow = 3;
				this.setCellValue(this.head, vOld);
				break;
			
			case VOID:
				this.setCellValue(this.head, vOld);
				break;
				
			default:
				this.reset();
		}
	}

	getRandomPos() : [number, number] {
		const pos: [number, number] = [getRandom(0, this.dim()), getRandom(0, this.dim())];
		if (this.getCellValue(pos) == VOID) {
			return pos;
		}
		else {
			return this.getRandomPos();
		}
	}
}