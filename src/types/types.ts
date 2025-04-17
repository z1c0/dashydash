import { Moment } from "moment";

export type Appointment = {
	title: string;
	due: string;
	startDate: Moment;
	endDate: Moment;
	fullDayEvent: boolean;
	time?: string;
	id?: number;
}

export type Article = {
	image: string;
	title: string;
	description: string;
};
