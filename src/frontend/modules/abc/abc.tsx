import { memo, useMemo, useState } from 'react';
import { getRandomTheme } from '../../common/misc';
import moment from 'moment';
import useInterval from '../../hooks/useInterval';

const letters = [
	[ 'A', 'apple' ],
	[ 'B', 'banana' ],
	[ 'C', 'clown' ],
	[ 'D', 'dolphin' ],
	[ 'E', 'elephant' ],
	[ 'F', 'fish' ],
	[ 'G', 'guitar' ],
	[ 'H', 'house_with_garden' ],
	[ 'I', 'flag_it' ],
	[ 'J', 'flag_jp' ],
	[ 'K', 'camel' ],
	[ 'L', 'lion_face' ],
	[ 'M', 'mouse2' ],
	[ 'N', 'nose_tone1' ],
	[ 'O', 'ear_tone1' ],
	[ 'P', 'penguin' ],
	[ 'Q', 'frog' ],
	[ 'R', 'rocket' ],
	[ 'S', 'snake' ],
	[ 'T', 'taxi' ],
	[ 'U', 'metro' ],
	[ 'V', 'bird' ],
	[ 'W', 'whale' ],
	[ 'X', 'negative_squared_cross_mark' ],
	[ 'Y', 'regional_indicator_y' ],
	[ 'Z', 'checkered_flag' ],
];

export const Abc = memo(() => {
	const theme = useMemo(() => getRandomTheme(), []);
	const [index, setIndex] = useState(0);
	useInterval(
		() => setIndex((index + 1) % letters.length),
		moment.duration(10, 'seconds')
	);

	const l = letters[index];
	return (		
		<div className={theme + ' abc'}>
			<p>
				<span>{l[0]}</span>
				<i className={'e1a-' + l[1]}></i>
			</p>
		</div>
	);
});
Abc.displayName = 'Abc';
