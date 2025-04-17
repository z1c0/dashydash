import { Duration } from 'moment';
import { useEffect } from 'react';

function useInterval(
	callback: () => void,
	delay: Duration,
	runImmediately: boolean = false) {
	const intervalMillis = delay.asMilliseconds();
	useEffect(() => {
		const intervalId = setInterval(callback, intervalMillis);
		if (runImmediately) {
			callback();
		}
		return () => clearInterval(intervalId);
	}, [callback, intervalMillis]);
}

export default useInterval;