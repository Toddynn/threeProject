import { useEffect } from 'react';

export default function useInterval(prop: () => void, timeOut: number, dependencies?: any, actionAfterClearInterval?: () => void) {
	useEffect(() => {
		const interval = setInterval(prop, timeOut);
		return () => {
			clearInterval(interval);
			if (actionAfterClearInterval) {
				actionAfterClearInterval();
			}
		};
	}, dependencies);
}
