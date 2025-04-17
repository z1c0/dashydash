import { Abc } from '../modules/abc/abc';
import { Appointments } from '../modules/appointments/appointments';
import { Birthdays } from '../modules/birthdays/birthdays';
import { Blog } from '../modules/blog/blog';
import { Bus } from '../modules/bus/bus';
import { ColorTile } from '../modules/colorTile/colorTile';
import { Countdown } from  '../modules/countdown/countdown';
import { Flags } from '../modules/flags/flags';
import { Football } from '../modules/football/football';
import { Games } from '../modules/games/games';
import { News } from '../modules/news/news';
import { Numbers } from '../modules/numbers/numbers';
import { Pics } from '../modules/pics/pics';
import { Recipe } from '../modules/recipe/recipe';
import { StarWars } from '../modules/starwars/starwars';
import { TimeOfDay } from '../modules/timeofday/timeofday';
import { ToDo } from '../modules/todo/todo';
import { Italian, Spanish } from '../modules/vocab/vocab';
import { Weather } from '../modules/weather/weather';
import { Words } from '../modules/words/words';
import React from 'react';

const modules : Record<string, React.ComponentType> = {
	'abc' : Abc,
	'bus' : Bus,
	'games' : Games,
	'countdown' : Countdown,
	'starwars' : StarWars,
	'words' : Words,
	'weather' : Weather,
	'blog' : Blog,
	'birthdays' : Birthdays,
	'timeofday' : TimeOfDay,
	'appointments' : Appointments,
	'pics' : Pics,
	'football' : Football,
	'recipe' : Recipe,
	'todo' : ToDo,
	'flags' : Flags,
	'color' : ColorTile,
	'news' : News,
	'numbers' : Numbers,
	'spanish' : Spanish,
	'italian' : Italian,
};

export type ModuleInfo = {
	id: string;
	name: string;
	pos: [number, number, number, number];
}

export type BoardInfo = {
	name: string;
	modules: ModuleInfo[];
};

export function	getBoards(name: string) : BoardInfo[] {
	//console.log(name);
	const boardsConfig = require('./boards.config.json');
	const collection = boardsConfig[name] || boardsConfig["default"];
	const boards: BoardInfo[] = [];
	for (const name in collection) {
		const modules: ModuleInfo[] = [];
		const board = collection[name];
		//console.log(config);
		for (const m in board.modules) {
			modules.push({
				id : `${name}-${m}`,
				name : m,
				pos : board.modules[m],
			});
		}
		boards.push({
			name : name,
			modules : modules
		});
	}
	//console.log(boards);
	return boards;
}

export function getModule(name: string): React.ComponentType {
	if (!modules[name]) {
		console.error(`Module not found: "${name}"`);
		const InvalidModule = () => <div className='invalid-module'>Module not found: "{name}"</div>;
    InvalidModule.displayName = `InvalidModule-${name}`;
	}
	return modules[name];
}


