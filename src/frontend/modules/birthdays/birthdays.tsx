import { useMemo } from "react";
import { memo } from "react";
import { Calendar } from "../../common/calendar";

export const Birthdays = memo(() => {
	const icon = useMemo(() => <i className="e1a-birthday icon-text"></i>, []);
	return <Calendar route='birthdays' showTime={false} icon={icon} />;
});
Birthdays.displayName = 'Birthdays';

