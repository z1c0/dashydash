import { memo } from "react";
import { useFetchInterval } from "../../hooks/useFetchInterval";
import { duration } from "moment";
import { FetchErrorAware } from "../../common/fetchErrorAware";


type State = {
	from: string;
	to: string;
	times: [];
}

export const Bus = memo(() => {
	const fetchState = useFetchInterval<State>({
		route: "bus",
		interval: duration(1, 'minute')
	});
	return (
		<FetchErrorAware {...fetchState}>
			<div className='bus'>
				<i className="e1a-oncoming_bus icon-text"></i>
				<div>
					<p>{fetchState.data?.from}</p>
					<p>{fetchState.data?.to}</p>
				</div>
				{fetchState.data?.times.map(function(time, i){
					return <p className='busTime big-text' key={i}>{time}</p>
				})}
			</div>
		</FetchErrorAware>);
});
Bus.displayName = 'Bus';