export function setIntervalAndExecute(f: () => void, t: number) {
	f();
	return setInterval(f, t);
}

export function lowerCaseFirst(s : string) : string {
	return s.charAt(0).toLowerCase() + s.slice(1);
}

export function shuffle<T>(o: T[]) {
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

export function chance(percentage: number): boolean {
	return Math.random() * 100 < percentage;
}

export function randomBoolean(): boolean {
	return chance(50);
}

export function randomIntFromInterval(min: number, max: number) {
	// max inclusive
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandom(min: number, max: number) {
	// max is exclusive.
	return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomBool() {
	return Math.random() > 0.5;
}

export function getRandomElement<T>(arr: T[]) {
	return arr[getRandom(0, arr.length)];
}

export function createMatrix<T>(dim: number): T[][] {
	return Array.from({ length: dim }, () => Array<T>(dim));
}

export function getRandomTheme() {
	return shuffle([
		'theme-dark1',
		'theme-dark2',
		'theme-light'
	])[0];
}

export function randomWithVarianceInt(midValue: number, variance: number) : number {
	return Math.round(randomWithVariance(midValue, variance));
}

export function randomWithVariance(midValue: number, variance: number) : number {
	let min = Math.max(midValue - (variance / 2), 0);
	let max = midValue + (variance / 2);
	let value = min + ((max - min) * Math.random());
	return value;
}

export class Cursor<T> {
	idx: number;
	_array: Array<T>;
	
	constructor(array: Array<T>) {
		this._array = array;
		this.idx = 0;
	}

	array() {
		return this._array;
	}

	previous(): T {
		this.idx = (!!this.idx ? this.idx : this._array.length) - 1;
		return this._array[this.idx];
	}
	
	setCurrent(i: number): T {
		this.idx = i;
		return this.getCurrent();
	};

	getCurrent(): T {
		return this._array[this.idx];
	};
	
	next(): T {
		this.idx = (this.idx + 1) % this._array.length;
		return this._array[this.idx];
	}

	isEmpty(): boolean {
		return this._array.length === 0;
	}
}