import { duration } from "moment";
import { memo } from "react";
import { useFetchInterval } from "../../../frontend/hooks/useFetchInterval";
import { FetchErrorAware } from "../../common/fetchErrorAware";

type State = {
	text : string,
	author : string,
	image: string,
}

export const StarWars = memo(() => {
	const fetchState = useFetchInterval<State>({
		route: "starwars",
		interval: duration(30, 'seconds')
	});

	const style = {
		backgroundImage: 'url(' + fetchState.data?.image + ')'
	}
	return (
		<FetchErrorAware {...fetchState}>
			<div className='starwars' style={style}>
				<div className='starwars-overlay'>
					<blockquote>
						<p className="quote padded big-text">{fetchState.data?.text}</p>
					</blockquote>
					<cite className="author normal-text">{fetchState.data?.author}</cite>
				</div>
			</div>
		</FetchErrorAware>
	)
});
StarWars.displayName = 'StarWars';

