import moment, { duration } from 'moment';
import { memo } from 'react';
import { useFetchInterval } from '../../../frontend/hooks/useFetchInterval';
import { FetchErrorAware } from '../../common/fetchErrorAware';
import { getRandomElement } from '../../common/misc';
type Item = {
	due: { 
		date: string;
	}
	project_id: string;
	content: string
}

export const ToDo = memo(() => {
	const fetchState = useFetchInterval<Item[], Item[]>({
		route: "todo",
		interval: duration(30, 'minutes'),
		transform: (data) => {
			const items = data.sort((a: Item, b: Item) => {
				const large = moment().add(10, 'years');
				const dta = a.due ? moment(a.due.date) : large;
				const dtb = b.due ? moment(b.due.date) : large;
				return dta.diff(dtb);
			})
			return items;
		}
	});
	const createItem = function(item: Item, i: number) {
		let dotClass = 'e1a-white_circle';
		if (item.due) {
			const days = Math.round(moment.duration(moment(item.due.date).diff(moment())).asDays());
			if (days <= 3) {
				dotClass = 'e1a-red_circle';
			}
		}
		return (
			<li key={i} className='todoItem'>
				<span><i className={dotClass}></i>{item.content}</span>
			</li>);
	};

	const allDoneIcon = getRandomElement(['clap', 'rocket', 'tada', 'white_check_mark', 'cool', 'shrimp']);

	return (
		<FetchErrorAware {...fetchState}>
			<div className='todo'>
				<h1 className="big-text"><i className={"todo-icon e1a-clipboard"}></i>TODO</h1>
				{fetchState.data && fetchState.data.length > 0 ? (
					<ul className="small-text">
						{fetchState.data.map(createItem)}
					</ul>
				) : (
					<div className="no-items">
						<p><i className={"e1a-2x e1a-" + allDoneIcon}/></p>
						<p className='half-transparent-text italic-text'>Alles erledigt!</p>
					</div>
			)}
			</div>
		</FetchErrorAware>
	);
});
ToDo.displayName = 'ToDo';