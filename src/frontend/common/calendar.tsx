import moment from 'moment';
import React, { memo, ReactElement } from 'react';
import { useFetchInterval } from '../../frontend/hooks/useFetchInterval';
import { FetchErrorAware } from './fetchErrorAware';
import { Appointment } from '../../types/types'

interface CalendarProps {
	route: string,
	showTime: boolean,
	icon: ReactElement
}

export const Calendar : React.FC<CalendarProps> = memo(({ route, showTime, icon }) => {
	const fetchState = useFetchInterval<Appointment[]>({
		route,
		interval: moment.duration(20, 'minutes')
	});

	const createModule = function (a: Appointment, i: number) {
		const time = showTime ? (<span>, {a.time}</span>) : null;
		const isToday = !moment().isBefore(a.startDate, 'day');
		let calCol = '';
		if (isToday) {
			calCol = 'rgb(224, 224, 56)';
		}
		return (
			<li key={i} style={{ borderColor: calCol}}>
				<strong>{a.title}</strong><br />
				<i className="small-text"><span>{a.due}</span>{time}</i>
			</li>
		);
	};
	return (
		<FetchErrorAware {...fetchState}>
			<div className='calendar'>
				<div className="icon">
					{icon}
				</div>
				<ul>
					{fetchState.data?.map(createModule)}
				</ul>
			</div>
		</FetchErrorAware>
	);
});
Calendar.displayName = 'Calendar';
