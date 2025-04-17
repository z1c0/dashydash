import { memo, useMemo, useState } from 'react';
import { getRandomElement, getRandomTheme, randomIntFromInterval } from '../../common/misc';
import useInterval from '../../../frontend/hooks/useInterval';
import { duration } from 'moment';
import { ResponsiveContainer } from '../../common/responsiveContainer';

type Symbol = '+' | '-' | 'x' | ':';
type MathState = {
	turn: number;
	n1: number;
	n2: number;
	symbol: Symbol;
	result: number;
}

const next = (turn: number): MathState => {
	let n1 = 0;
	let n2 = 0;
	let symbol = getRandomElement<Symbol>(['+', '-', 'x', ':']);
	let result = 0;

	if (symbol == '-') {
		n1 = randomIntFromInterval(0, 50);
		n2 = randomIntFromInterval(1, 50);
		result = n1 - n2;
	}
	else if (symbol == '+') {
		n1 = randomIntFromInterval(1, 50);
		n2 = randomIntFromInterval(1, 50);
		result = n1 + n2;
	}
	else if (symbol == 'x') {
		n1 = randomIntFromInterval(1, 10);
		n2 = randomIntFromInterval(1, 10);
		result = n1 * n2;
	}
	else if (symbol == ':') {
		n2 = randomIntFromInterval(2, 3);
		result = randomIntFromInterval(1, 33);
		n1 = result * n2;
	}
	return {
		turn : turn + 1,
		n1 : n1,
		n2 : n2,
		symbol : symbol,
		result : result,
	}
}

export const Numbers = memo(() => {
	const theme = useMemo(() => getRandomTheme(), []);
	const [state, setState] = useState(next(0));
	useInterval(
		() => setState(next(state.turn)),
		duration(15, 'seconds')
	);

	return (
		<ResponsiveContainer>
			<div className={'numbers ' + theme}>
					<p>
						<span className='number'>{state.n1}</span>
						<span className='symbol'>{state.symbol}</span>
						<span className='number'>{state.n2}</span>
						<span className='symbol'>=</span>
						<span key={state.turn} className='number result'>{state.result}</span>
					</p>
			</div>
		</ResponsiveContainer>
	);
});
Numbers.displayName = 'Numbers';


