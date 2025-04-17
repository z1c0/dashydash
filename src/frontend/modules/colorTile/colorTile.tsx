import { memo } from 'react';
import { getRandomElement } from '../../common/misc';

const color = getRandomElement([
	'#a4c400',  //lime
	'#60a917',  // gree
	'#008a00',  // emeral
	'#00aba9',  // teal
	'#1ba1e2',  // cyan
	'#0050ef',  // cobalt
	'#6a00ff',  // indigo
	'#aa00ff',  // violet
	'#f472d0',  // pink
	'#d80073',  // magenta
	'#a20025',  // crimson
	'#e51400',  // red
	'#fa6800',  // orange
	'#f0a301',  // amber
	'#e3c800',  // yellow
	'#825a2c',  // brown
	'#6d8764',  // olive
	'#647687',  // steel
	'#76608a',  // mauve
	'#87794e',  // taupe
]);

export const ColorTile = memo(() => {
	const style = {
		backgroundColor : color
	}
	return <div className="colorTile" style={style}/>;
});
ColorTile.displayName = 'ColorTile';