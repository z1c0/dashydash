import { useState } from 'react';
import useInterval from './hooks/useInterval';
import { duration } from 'moment';
import moment from 'moment';

export const Overlays = () => {
	useInterval(
		() => {
			const now = moment();
			return setTime({
				time : now.format('HH:mm'),
				seconds : now.format('ss')
			});
		},
		duration(1, 'seconds')
	);
	const [time, setTime] = useState({ time: '', seconds: '' });

	const handleClick = () => {
		const newLocation = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
		//console.log(newLocation);
		window.location.href = newLocation;
	};

	return (
		<div>
			<div id="home" onClick={handleClick}><i className="fa fa-home big-text"></i></div>
			<div id="datetime">
				<span className="time big-text">{time.time}</span>
				<span className="seconds normal-text">{time.seconds}</span>
			</div>
		</div>
	);
}

