import { memo, useMemo } from 'react';
import { Calendar } from '../../common/calendar';
import moment from 'moment';
import "moment/locale/de";
moment.locale('de');

export const Appointments = memo(() => {
	const icon = useMemo(() => {
		const now = new Date();
		return (
			<time>
				<strong>{moment.months()[now.getMonth()]}</strong>
				<span>{now.getDate()}</span>
			</time>
		);
	}, []);

	return <Calendar route='appointments' showTime={true} icon={icon} />;
});
Appointments.displayName = 'Appointments';


