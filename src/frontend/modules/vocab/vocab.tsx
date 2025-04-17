import React, { memo, useState } from 'react';
import { getRandomElement } from '../../common/misc';
import useInterval from '../../../frontend/hooks/useInterval';
import moment from 'moment';

interface VocabProps {
	words: string[][];
	country: 'es' | 'it' | 'gb';
}

const Vocab: React.FC<VocabProps> = memo(({ words, country}) => {
	const [word, setWord] = useState(getRandomElement(words));
	useInterval(
		() => setWord(getRandomElement(words)),
		moment.duration(10, 'seconds')
	);

	const flagIcon = 'e1a-flag_' + country;
	return (
		<div className='vocab big-text'>
			<p>{word[0]}</p>
			<p className='flagicon icon-text'><i className={flagIcon}></i></p>
			<p key={word[1]} className='animate-appear'>{word[1]}</p>
		</div>
	)
});
Vocab.displayName = 'Vocab';

export const Spanish = memo(() => {
	const words: string[][] = require('./spanish.json');
	return <Vocab words={words} country='es' />;
});
Spanish.displayName = 'Spanish';

export const Italian = memo(() => {
	const words: string[][] = require('./italian.json');
	return <Vocab words={words} country='it' />;
});
Italian.displayName = 'Italian';
