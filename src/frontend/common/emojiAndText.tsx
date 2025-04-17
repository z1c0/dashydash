import React, { memo, useMemo, useState } from 'react';
import { getRandomTheme, shuffle } from './misc';
import useInterval from '../../frontend/hooks/useInterval';
import moment from 'moment';
import { ResponsiveContainer } from './responsiveContainer';

interface EmojiAndTextProps {
	list: string[][],
	appearText: boolean,
}

export const EmojiAndText: React.FC<EmojiAndTextProps> = memo(({ list, appearText }) => {
	const theme = useMemo(() => getRandomTheme(), []);
	const [index, setIndex] = useState(0);
	useInterval(
		() => setIndex((index + 1) % list.length),
		moment.duration(12, 'seconds')
	);

	list = shuffle(list);
	const l = list[index];
	let top;
	let bottom;
	if (appearText) {
		top = <i key={l[1] + '-emoji'} className={'e1a-' + l[1]}></i>
		bottom = <p key={l[1] + '-text'} className='animate-appear'>{l[0].toUpperCase()}</p>
	}
	else {
		top = <p key={l[1] + '-text'}>{l[0].toUpperCase()}</p>
		bottom = <i key={l[1] + '-emoji'} className={'animate-appear e1a-' + l[1]}></i>
	}
	return (
		<ResponsiveContainer scaleFactor={10}>
			<div className={'emojiAndText ' + theme}>
				{top}
				{bottom}
			</div>
		</ResponsiveContainer>
	);
});
EmojiAndText.displayName = 'EmojiAndText';
