import { useEffect, useRef, useState } from 'react';

function AutoCounter({
	initialValue = 0,
	limiter,
	increment = 1,
	interval = 100,
	type = 'increment',
	className = '',
}) {
	const [counter, setCounter] = useState(initialValue);
	const intervalRef = useRef();

	useEffect(() => {
		if (limiter === undefined || limiter === null) return;

		const increaseNum = () => {
			setCounter((prev) => {
				let stop = false;

				if (type === 'increment' && prev >= limiter) stop = true;
				if (type === 'decrement' && prev <= limiter) stop = true;

				return stop ? limiter : prev + increment;
			});
		};

		intervalRef.current = setInterval(increaseNum, interval);

		return () => {
			clearInterval(intervalRef.current);
		};
	}, [limiter, increment, interval, type]);

	return <span className={className}>{counter}</span>;
}

export default AutoCounter;
