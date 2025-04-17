import { memo } from 'react';
import { FetchErrorAware } from '../../common/fetchErrorAware';
import moment from 'moment';
import { useFetchInterval } from '../../../frontend/hooks/useFetchInterval';

type State = {
	name: string
	description: string
	temperature: string
	min: string
	max: string
	icon: string
}

export const Weather  = memo(() => {
	const fetchState = useFetchInterval<State>({
		route: "weather",
		interval: moment.duration(30, 'minutes')
	});

	return (
		<FetchErrorAware {...fetchState}>
			<div className='weather big-text'>
				<p>{fetchState.data?.description}</p>
				<i className={"biggest-text " + `wi ${ fetchState.data?.icon }`}></i>
				<span className="temperature biggest-text">{fetchState.data?.temperature} °C</span>
				<span id="minTemp"> &darr; </span><span>{fetchState.data?.min}°</span>
				<span id="maxTemp"> &uarr; </span><span>{fetchState.data?.max}°</span>
			</div>
		</FetchErrorAware>
	);
});
Weather.displayName = 'Weather';


