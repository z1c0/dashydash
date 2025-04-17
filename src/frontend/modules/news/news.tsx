import { duration } from "moment";
import { memo } from "react";
import { useFetchInterval } from "../../hooks/useFetchInterval";
import { Article } from "../../../types/types";
import { FetchErrorAware } from "../../common/fetchErrorAware";

export const News = memo(() => {
	const fetchState = useFetchInterval<Article>({
		route: "news",
		interval: duration(30, 'seconds')
	});

	return (
		<FetchErrorAware {...fetchState}>
			<div className='news' style={{ backgroundImage: 'url(' + fetchState.data?.image + ')' }}>
				<div className="articleText">
					<h1>{fetchState.data?.title}</h1>
					<p>{fetchState.data?.description}</p>
				</div>
			</div>
		</FetchErrorAware>
	)
});
News.displayName = 'News';