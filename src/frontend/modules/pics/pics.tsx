import { memo, useMemo, useState } from 'react';
import { randomIntFromInterval } from '../../common/misc';
import { useFetchInterval } from '../../../frontend/hooks/useFetchInterval';
import moment from 'moment';

type PicsState = {
	url: string;
};
export const Pics = memo(() => {
	const [render, forceRender] = useState(0);
	const interval = useMemo(() => moment.duration(randomIntFromInterval(20, 30), 'seconds'), [render]);
	const fetchState = useFetchInterval<PicsState>({
		route: "pics",
		interval,
	});

	const handleClick = () => forceRender((prev) => prev + 1);
	return (
		fetchState.data && <div key={fetchState.data?.url} className='pic' style={{ backgroundImage: 'url(' + CSS.escape(fetchState.data?.url) + ')' }} onClick={handleClick}></div>
	);
});
Pics.displayName = 'Pics';
