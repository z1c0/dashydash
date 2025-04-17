import { memo } from "react";
import { useFetchInterval } from "../../../frontend/hooks/useFetchInterval";
import { duration } from "moment";
import { FetchErrorAware } from "../../common/fetchErrorAware";

type State = {
	title: string,
	text: string,
	image: string,
	url: string
}

export const Recipe = memo(() => {
	const fetchState = useFetchInterval<State>({
		route: "recipe",
		interval: duration(2, 'hours')
	});

	const style = {
		backgroundImage: 'url(' + fetchState.data?.image + ')'
	}
	return (
		<FetchErrorAware {...fetchState}>
			<div className='recipe' style={style}>
				<p className="padded bold-text">{fetchState.data?.title}</p>
				<p className="padded small-text">{fetchState.data?.text}</p>
			</div>
		</FetchErrorAware>
	);
});
Recipe.displayName = 'Recipe';

