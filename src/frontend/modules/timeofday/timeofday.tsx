import { memo } from 'react';
import { duration } from 'moment';
import { useFetchInterval } from '../../../frontend/hooks/useFetchInterval';
import { FetchErrorAware } from '../../common/fetchErrorAware';

type State = {
	text : string,
	emoji : string,
	imageUrl : string
}

export const TimeOfDay = memo(() => {
	const fetchState = useFetchInterval<State>({
		route: "timeofday",
		interval: duration(45, 'seconds')
	})

	const divStyle = {
		backgroundImage: 'url(' + fetchState.data?.imageUrl + ')'
	}
	return (
		<FetchErrorAware {...fetchState}>
			<div className='timeofday'>
				<div className="giphy" style={divStyle}></div>
				<p className='biggest-text'>
					<span>{fetchState.data?.text}</span>
					<i className={"icon-text " + fetchState.data?.emoji}></i>
				</p>
			</div>
		</FetchErrorAware>
	)
});
TimeOfDay.displayName = 'TimeOfDay';
