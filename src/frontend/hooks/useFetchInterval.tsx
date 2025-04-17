import { useEffect, useState } from "react";
import { lowerCaseFirst } from "../common/misc";
import { Duration } from "moment";

interface FetchOptions<T, R> {
	route: string;
	interval: Duration;
	queryParams?: { [key: string]: string };
	transform?: (_data: T) => R; // Optional transformation function
}

function objectToQueryString(obj: { [key: string]: string }) {
	return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

export const useFetchInterval = <T, R = T>({ route, interval, queryParams, transform }: FetchOptions<T, R>) => {
	const [data, setData] = useState<R | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const intervalMillis = interval.asMilliseconds();
	useEffect(() => {
		let isMounted = true; // Prevents state updates after unmount

		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);
				let url = '/api/' + lowerCaseFirst(route);
				if (queryParams) {
					url += '?' + objectToQueryString(queryParams);
				}
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				let result: T = await response.json();
				if (transform) {
					result = transform(result) as unknown as T; // Apply transformation if provided
				}
				if (isMounted) {
					setData(result as unknown as R);
				}
			} catch (err) {
				if (isMounted) {
					setError((err as Error).message);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		fetchData(); // Initial fetch

		const intervalId = setInterval(fetchData, intervalMillis);

		return () => {
			isMounted = false;
			clearInterval(intervalId);
		};
	}, [route, intervalMillis, queryParams]);

	return { data, loading, error };
};
