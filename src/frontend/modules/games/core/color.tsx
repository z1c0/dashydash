import { getRandom, getRandomElement } from "../../../common/misc";

export type Color = {
	r: number,
	g: number,
	b: number,
}
export const Color = (r: number, g: number, b: number): Color => ({ r, g, b });

export const Colors = {
	Black: { r: 0, g: 0, b: 0 },                // #020202
	White: { r: 255, g: 255, b: 255 },          // #FFFFFF
	Red: { r: 255, g: 0, b: 0 },                // #FF0000
	Yellow: { r: 0xFF, g: 0xFF, b: 0x00 },      // #FFFF00
	SoftGray: { r: 0xF1, g: 0xF1, b: 0xF1 },    // #F1F1F1
	Obsidian: { r: 2, g: 2, b: 2 },             // #020202
	LimeGreen: { r: 50, g: 205, b: 50 },        // #32CD32
	Cyan: { r: 0, g: 255, b: 255 },             // #00FFFF
	CornflowerBlue: { r: 100, g: 149, b: 237 }, // #6495ED
	Purple: { r: 128, g: 0, b: 128 },           // #800080
	Gold: { r: 255, g: 215, b: 0 },             // #FFD700
	BrightRed: { r: 253, g: 58, b: 74 },        // #FD3A4A
	LimeYellow: { r: 167, g: 244, b: 50 },      // #A7F432
	SkyBlue: { r: 93, g: 173, b: 236 },         // #5DADEC
	HotPink: { r: 255, g: 0, b: 124 },          // #FF007C
	NeonYellow: { r: 255, g: 247, b: 0 },       // #FFF700
	DarkSlateGray: { r: 47, g: 79, b: 79 },     // #2F4F4F
	Charcoal: { r: 0x22, g: 0x22, b: 0x22 },    // #222222
	Crimson: { r: 0xDC, g: 0x14, b: 0x3C },     // #DC143C
	LightPink: { r: 0xFF, g: 0xB6, b: 0xC1 },   // #FFB6C1
	RosyBrown: { r: 0xBC, g: 0x8F, b: 0x8F },   // #BC8F8F
	IndianRed: { r: 0xCD, g: 0x5C, b: 0x5C },   // #CD5C5C
	Brown: { r: 0xA5, g: 0x2A, b: 0x2A },       // #A52A2A
	Orange: { r: 0xFF, g: 0xA5, b: 0x00 },      // #FFA500
	Turquoise: { r: 0x40, g: 0xE0, b: 0xD0 },   // #40E0D0
	NeonGreen: { r: 0x04, g: 0xFC, b: 0x04 },   // #04FC04
	Peach: { r: 0xFF, g: 0xEB, b: 0xDF },       // #FFEBDF
	RoyalBlue: { r: 0x00, g: 0x2D, b: 0xFF },   // #002DFF
	WhiteSmoke: { r: 0xF5, g: 0xF5, b: 0xF5 },  // #F5F5F5
	DarkGreen: { r: 0x00, g: 0x64, b: 0x00 },   // #006400
	Chartreuse: { r: 0x7F, g: 0xFF, b: 0x00 },  // #7FFF00
	DodgerBlue: { r: 0x1E, g: 0x90, b: 0xFF },  // #1E90FF
	Fuchsia: { r: 0xFF, g: 0x00, b: 0xFF },     // #FF00FF
	DeepPink: { r: 0xFF, g: 0x14, b: 0x93 },    // #FF1493
	LightGray: { r: 0xD3, g: 0xD3, b: 0xD3 },   // #D3D3D3
	SlateGray: { r: 0x70, g: 0x80, b: 0x90 },   // #708090
	DeepBlue: { r: 0x00, g: 0x0D, b: 0xFE },    // #000DFE
	FieryRed: { r: 0xFE, g: 0x0E, b: 0x00 },    // #FE0E00
	WarmOrange: { r: 0xFF, g: 0x81, b: 0x13 },  // #FF8113
	NeonCyan: { r: 0x15, g: 0xFF, b: 0xFE },    // #15FFFE
	PastelPink: { r: 0xFD, g: 0x98, b: 0xCA },  // #FD98CA
	LeafGreen: { r: 0x62, g: 0xC4, b: 0x2E },   // #62C42E
	BurntCoral: { r: 0xEF, g: 0x4D, b: 0x3C },  // #EF4D3C
}

export function getRandomColor() {
	return getRandomElement([
		Colors.Red,
		Colors.Yellow,
		Colors.Chartreuse,
		Colors.DodgerBlue,
		Colors.Fuchsia,
		Colors.Cyan,
		Colors.DeepPink,
		Colors.Orange,
		Colors.Purple,
	]);
}

export function getRandomGray() {
	const g = getRandom(0, 256);
	return Color(g, g, g);
}

export function generateShades(color: Color): Color[] {
	const adjust = (value: number, factor: number): number => {
		return Math.max(0, Math.min(255, Math.round(value * factor)));
	};

	const factors = [1.4, 1.2, 1.1, 1, 0.9, 0.8, 0.6];

	return factors.map(factor => ({
		r: adjust(color.r, factor),
		g: adjust(color.g, factor),
		b: adjust(color.b, factor)
	}));
}

export function darken(color: Color, step: number): Color {
	return {
		r: Math.max(0, color.r - step),
		g: Math.max(0, color.g - step),
		b: Math.max(0, color.b - step),
	}
}