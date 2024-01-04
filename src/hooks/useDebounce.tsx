import { useState, useEffect } from 'react';

function useDebounceValue<T>(value: T, delay: number): T {
	const [delayValue, setDelayValue] = useState<T>(value);

	useEffect(() => {
		if (typeof value === 'string' && value.trim() === '') return;

		const timer = setTimeout(() => {
			console.log('디바운스 밸류 도착~', value);
			setDelayValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return delayValue;
}

export default useDebounceValue;
