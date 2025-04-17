import { memo } from 'react';
import moment, { duration } from 'moment';
import { useFetchInterval } from '../../../frontend/hooks/useFetchInterval';
import { FetchErrorAware } from '../../common/fetchErrorAware';

type BlogEntry = {
	title: string,
	featuredImage: string;
	description: string;
	published: string;
}
type State = {
	title: string,
	image: string,
	text: string,
	published : string
}

export const Blog = memo(() => {
	const fetchState = useFetchInterval<BlogEntry[], State>({
		route: "blog",
		interval: duration(1, 'hour'),
		transform: (data) => ({
			title: data[0].title,
			image: data[0].featuredImage,
			text: data[0].description,
			published: moment.duration(moment(data[0].published).diff(moment())).humanize(true)
		})
	});

	const style = {
		backgroundImage: 'url(' + fetchState.data?.image + ')'
	}
	return (
		<FetchErrorAware {...fetchState}>
			<div className='blog' style={style}>
				<div className='blog-overlay'>
					<p className="padded bold-text">{fetchState.data?.title}</p>
					<p className="padded small-text">{fetchState.data?.published}</p>
					<p className="padded small-text">{fetchState.data?.text}</p>
				</div>
			</div>
		</FetchErrorAware>
	);
});
Blog.displayName = 'Blog';
