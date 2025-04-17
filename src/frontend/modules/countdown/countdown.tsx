import { memo, useMemo, useState } from "react";
import { Cursor, getRandomTheme } from "../../common/misc";
import moment from "moment";
import useInterval from "../../hooks/useInterval";

const allEvents = [
	{ title: "Ferien",
		date: moment('2025-07-24', 'YYYY-MM-DD'),
		emoji: 'palm_tree'
	},
];

function addYearly(title: string, emoji: string, day: number, month: number) {
	allEvents.push({
		title: title,
		date: moment().year(moment().year()).month(month - 1).date(day),
		emoji : emoji
	});
}

addYearly("Halloween", "jack_o_lantern", 31, 10)
addYearly("Weihnachten", "christmas_tree", 24, 12)
addYearly("Silvester", "fireworks", 31, 12)

function getDayDiff(e: { title?: string; date: moment.Moment; emoji?: string; }) {
	const MS_PER_DAY = 1000 * 60 * 60 * 24;
	// Discard the time and time-zone information.
	const d = e.date.toDate();
	const utc1 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
	const today = new Date();
	const utc2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
	return Math.floor((utc1 - utc2) / MS_PER_DAY);
}

const nextEvents = new Cursor(allEvents
	.map(e => ({ ...e, days: getDayDiff(e) }))
	.sort((e1, e2) => e1.days - e2.days)
	.filter(e => e.days >= 0)
	.slice(0, 3));
  
type CountdownState = {
	days: number;
	title: string;
	emoji: string;
};

export const Countdown = memo(() => {
	const theme = useMemo(() => getRandomTheme(), []);
	const [state, setState] = useState<CountdownState>(nextEvents.getCurrent());
	useInterval(
		() => setState(nextEvents.next()),
		moment.duration(8, 'seconds')
	);

	const text = state.days === 1 ? 'Tag' : 'Tage';
	return (
		<div className={'countdown ' + theme}>
			<div>
				<p><span className='normal-text half-transparent-text'>noch&nbsp;</span><span className='bold-text icon-text'>{state.days}</span><span className='normal-text half-transparent-text'>&nbsp;{text}</span></p>
				<p><span className='normal-text half-transparent-text'>bis&nbsp;</span><span className="bold-text slightly-big-text">{state.title}</span><i className={'padded biggest-text e1a-' + state.emoji}></i></p>
			</div>
		</div>
	);
});
Countdown.displayName = 'Countdown';