import { createMatrix, getRandom, getRandomBool, shuffle } from '../../common/misc';
import { BaseGame } from './core/baseGame';
import { Color, Colors } from './core/color';

const VOID = 0;
const GRID = 1;
const CIRCLE = 2;
const CIRCLE_WIN = 12;
const CROSS = 3;
const CROSS_WIN = 13;
	
const STATE_PLAYING = 1;
const STATE_WINNER = 2;
const STATE_OVER = 3;


export class TicTacToe extends BaseGame {
	playerOne: boolean;
	field: number[][];
	state: number = 0;
	playSmart: boolean = false;

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.playerOne = false;
		this.field = createMatrix(3);

		this.reset();
	}

	reset() {
		this.state = STATE_PLAYING;
		this.playSmart = getRandomBool();
		this.playerOne = getRandomBool();
		
		for (var i = 0; i < this.field.length; i++) {
			for (var j = 0; j < this.field.length; j++) {
				this.field[i][j] = VOID;
			}
		}			
		for (var i = 0; i < this.dim(); i++) {
			for (var j = 0; j < this.dim(); j++) {
				var col = VOID;
				if (i != 0 && j != 0 && i != this.dim() - 1 && j != this.dim() - 1) {
					if (i == 10 || i == 21 || j == 10 || j == 21) {
						col = GRID;
					}
				}
				this.display.setPixel(i, j, this.toColor(col));
			}
		}
	}

	override getInterval() {
		return 750;
	}
	
	getNextPos() {
		// create array of empty fields
		var pos = 0;
		var candidates = [];
		for (var y = 0; y < 3; y++) {
			for (var x = 0; x < 3; x++) {
				if (this.field[x][y] == VOID) {
					candidates.push({
						x : x,
						y : y
					});
				}
			}
		}
		candidates = shuffle(candidates);
		
		if (this.playSmart) {
			// evaluate fields
			var highScore = -1;
			for (var i = 0; i < candidates.length; i++) {
				var c = candidates[i];
				var score = 0;
				score += this.evaluateLine([[0, c.y], [1, c.y], [2, c.y]]);
				score += this.evaluateLine([[c.x, 0], [c.x, 1 ], [c.x, 2]]);
				if (c.x == c.y) {
					score += this.evaluateLine([[0, 0], [1, 1 ], [2, 2]]);
				}
				else if (c.x + c.y == 2) {
					score += this.evaluateLine([[2, 0], [1, 1 ], [2, 0]]);
				}
				if (score > highScore) {
					highScore = score;
					pos = i;
				}
			} 
		}
		else {
			// random empty field
			pos = getRandom(0, candidates.length);
		}
		return candidates[pos];
	}
	
	evaluateLine(cells: number[][]) {
		var score = 1;
		var result = this.checkLine(cells, false);
		if (result.x == 2 || result.o == 2) {
			score += 2;
		}
		return score;
	}
	
	checkLine(cells: number[][], mark: boolean) {
		var x = 0;
		var o = 0;
		for (var i = 0; i < 3; i++) {
			var v = this.field[cells[i][0]][cells[i][1]];
			if (v == CIRCLE) {
				o++;
			}
			else if (v == CROSS) {
				x++;
			}
		}
		if (this.state != STATE_WINNER) {
			if (mark && (x == 3 || o == 3)) {
				this.state = STATE_WINNER;
				for (var i = 0; i < 3; i++) {
					this.draw(cells[i][0], cells[i][1], this.field[cells[i][0]][cells[i][1]] + 10); 
				}
			}
		}
		return {
			x : x,
			o: o,
		};
	}
	
	checkIfOver() {
		this.checkLine([[0, 0], [1, 1], [2, 2]], true);
		this.checkLine([[2, 0], [1, 1], [0, 2]], true);
		for (var i = 0; i < 3; i++) {
			this.checkLine([[i, 0], [i, 1], [i, 2]], true);
			this.checkLine([[0, i], [1, i], [2, i]], true);
		}
		
		if (this.state == STATE_PLAYING) {
			var voids = 0;
			for (var i = 0; i < this.field.length; i++) {
				for (var j = 0; j < this.field.length; j++) {
					if (this.field[i][j] == VOID) {
						voids++;
					}
				}
			}
			if (voids == 0) {
				this.state = STATE_OVER;
			}
		}
	}
	
	simulate() {
		if (this.state == STATE_PLAYING) {
			this.checkIfOver();
		}
		
		if (this.state == STATE_OVER) {
			this.reset();
		}
		else if (this.state == STATE_WINNER) {
			this.state = STATE_OVER;
		}
		else {
			const what = this.playerOne ? CIRCLE : CROSS;
			var pos = this.getNextPos();
			this.draw(pos.x, pos.y, what);
			this.field[pos.x][pos.y] = what;
			this.playerOne = !this.playerOne;
		}
	}	

	draw(col: number, row: number, what: number) {
		const color = this.toColor(what);
		const offX = col * 11 + 1;
		const offY = row * 11 + 1;
		if (what == CIRCLE || what == CIRCLE_WIN) {
			this.display.setPixel(offX + 3, offY + 0, color);
			this.display.setPixel(offX + 2, offY + 1, color);
			this.display.setPixel(offX + 1, offY + 1, color);
			this.display.setPixel(offX + 1, offY + 2, color);
			this.display.setPixel(offX + 0, offY + 3, color);
		}
		else {
			this.display.setPixel(offX + 0, offY + 0, color);
			this.display.setPixel(offX + 1, offY + 1, color);
			this.display.setPixel(offX + 2, offY + 2, color);
			this.display.setPixel(offX + 3, offY + 3, color);
		}
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				const x = offX + j;
				const y = offY + i;
				const v = this.display.getPixel(x, y);
				this.display.setPixel(x, offY + 7 - i, v);
				this.display.setPixel(offX + 7 - j, y, v);
				this.display.setPixel(offX + 7 - j, offY + 7 - i, v);
			}
		}
	}

	toColor(n: number): Color {
		switch (n) {
			case GRID:
				return Colors.SoftGray;
				
				case CIRCLE:
					return this.playSmart ? Colors.LimeGreen : Colors.Cyan;
					
				case CROSS:
					return this.playSmart ? Colors.CornflowerBlue : Colors.Purple;
					
				case CIRCLE_WIN:
				case CROSS_WIN:
					return Colors.Gold;
					
			default:
				return Colors.Obsidian;
		}
	}
}
