import { Color } from '../core/color';
import { Display } from '../core/display';
import { BaseAnimation } from './baseanimation';

const MAX_ROUNDS = 500;

export const rgbs_r: Color[] = [
	{ r: 0x00, g: 0x00, b: 0x00 }, // #000000
	{ r: 0x00, g: 0x00, b: 0x00 }, // #000000
	{ r: 0x01, g: 0x01, b: 0x01 }, // #010101
	{ r: 0x03, g: 0x03, b: 0x03 }, // #030303
	{ r: 0x07, g: 0x07, b: 0x07 }, // #070707
	{ r: 0x1F, g: 0x07, b: 0x07 }, // #1F0707
	{ r: 0x1F, g: 0x07, b: 0x07 }, // #1F0707
	{ r: 0x2F, g: 0x0F, b: 0x07 }, // #2F0F07
	{ r: 0x8F, g: 0x27, b: 0x07 }, // #8F2707
	{ r: 0x9F, g: 0x2F, b: 0x07 }, // #9F2F07
	{ r: 0xC7, g: 0x47, b: 0x07 }, // #C74707
	{ r: 0xDF, g: 0x4F, b: 0x07 }, // #DF4F07
	{ r: 0xDF, g: 0x57, b: 0x07 }, // #DF5707
	{ r: 0xD7, g: 0x5F, b: 0x07 }, // #D75F07
	{ r: 0xCF, g: 0x6F, b: 0x0F }, // #CF6F0F
	{ r: 0xCF, g: 0x7F, b: 0x0F }, // #CF7F0F
	{ r: 0xC7, g: 0x87, b: 0x17 }, // #C78717
	{ r: 0xB7, g: 0xB7, b: 0x37 }, // #B7B737
];
export const rgbs_g: Color[] = [
	{ r: 0x00, g: 0x00, b: 0x00 }, // #000000
	{ r: 0x00, g: 0x00, b: 0x00 }, // #000000
	{ r: 0x01, g: 0x01, b: 0x01 }, // #010101
	{ r: 0x03, g: 0x03, b: 0x03 }, // #030303
	{ r: 0x07, g: 0x07, b: 0x07 }, // #070707
	{ r: 0x1F, g: 0x07, b: 0x07 }, // #1F0707
	{ r: 0x00, g: 0x07, b: 0x00 }, // #000700
	{ r: 0x00, g: 0x4F, b: 0x00 }, // #004F00
	{ r: 0x00, g: 0x47, b: 0x00 }, // #004700
	{ r: 0x00, g: 0x5F, b: 0x00 }, // #005F00
	{ r: 0x00, g: 0x57, b: 0x00 }, // #005700
	{ r: 0x00, g: 0x5F, b: 0x00 }, // #005F00
	{ r: 0x00, g: 0x67, b: 0x00 }, // #006700
	{ r: 0x00, g: 0x6F, b: 0x00 }, // #006F00
	{ r: 0x00, g: 0x7F, b: 0x00 }, // #007F00
	{ r: 0x00, g: 0x9F, b: 0x00 }, // #009F00
	{ r: 0x00, g: 0xA7, b: 0x00 }, // #00A700
	{ r: 0x00, g: 0xC7, b: 0x00 }, // #00C700
];
export const rgbs_b: Color[] = [
	{ r: 0x00, g: 0x00, b: 0x00 }, // #000000
	{ r: 0x00, g: 0x00, b: 0x00 }, // #000000
	{ r: 0x01, g: 0x01, b: 0x01 }, // #010101
	{ r: 0x03, g: 0x03, b: 0x03 }, // #030303
	{ r: 0x07, g: 0x07, b: 0x07 }, // #070707
	{ r: 0x1F, g: 0x07, b: 0x07 }, // #1F0707
	{ r: 0x00, g: 0x07, b: 0x00 }, // #000700
	{ r: 0x0E, g: 0x06, b: 0x63 }, // #0e0663
	{ r: 0x14, g: 0x09, b: 0x99 }, // #140999
	{ r: 0x27, g: 0x1B, b: 0xAA }, // #271baa
	{ r: 0x46, g: 0x41, b: 0xF4 }, // #4641f4
	{ r: 0x41, g: 0x58, b: 0xF4 }, // #4158f4
	{ r: 0x41, g: 0x73, b: 0xF4 }, // #4173f4
	{ r: 0x41, g: 0x8B, b: 0xF4 }, // #418bf4
	{ r: 0x41, g: 0x9D, b: 0xF4 }, // #419df4
	{ r: 0x41, g: 0xAF, b: 0xF4 }, // #41aff4
	{ r: 0x41, g: 0xBF, b: 0xF4 }, // #41bef4
	{ r: 0x42, g: 0xCE, b: 0xF4 }, // #42cef4
];

export class Fire extends BaseAnimation {
	rgbs: Color[];
	firePixels: number[];
	rounds: number = 0;

	constructor(dimension: number) {
		super();
		const r = Math.random();

		if (r < 0.6) {
			this.rgbs = rgbs_r;
		}
		else if (r < 0.8) {
			this.rgbs = rgbs_g;
		}
		else {
			this.rgbs = rgbs_b;
		}
		this.firePixels = [];
		for (let i = 0; i < dimension * dimension; i++) {
			this.firePixels[i] = 0;
		}	
		this.setBottomRow(this.rgbs.length - 1, dimension);
		this.rounds = 0
	}

	doFire(dimension: number) {
		for(let x = 0 ; x < dimension; x++) {
			for (let y = 1; y < dimension; y++) {
				this.spreadFire(y * dimension + x, dimension);
			}
		}
	}

	spreadFire(src: number, dimension: number) {
		const rand = Math.round(Math.random() * 3) & 3;
		var dst = src - rand + 1;
		this.firePixels[dst - dimension] = Math.max(0, this.firePixels[src] - (rand & 1));
	}

	override isOver() {
		return this.rounds === MAX_ROUNDS;
	}
	
	isGoingOut() {
		return this.rounds >= MAX_ROUNDS - 45;
	}

	setBottomRow(col: number, dimension: number) {
		for (let i = 0; i < dimension; i++) {
			this.firePixels[(dimension - 1) * dimension + i] = col;
		}
	}
	
	override render(display: Display) {
		this.doFire(display.dimension());

		for (let y = 0; y < display.dimension(); y++){ 
			for (let x = 0; x < display.dimension(); x++) {
				let index = this.firePixels[display.dimension() * y + x];
				if (index !== 0 || this.isGoingOut()) {
					display.setPixel(x, y, this.rgbs[index]);
				}
			}
		}

		this.rounds++;

		if (this.isGoingOut()) {
			this.setBottomRow(0, display.dimension());
		}
	}
}
