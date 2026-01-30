import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCountdownOptions {
	initialSeconds: number;
	autoStart?: boolean;
}

interface UseCountdownReturn {
	remainingTime: number;
	isExpired: boolean;
	start: () => void;
	reset: () => void;
}

/**
 *  카운트다운 타이머 hook
 */
export function useCountdown({ initialSeconds, autoStart = false }: UseCountdownOptions): UseCountdownReturn {
	const [remainingTime, setRemainingTime] = useState(initialSeconds);
	const [isRunning, setIsRunning] = useState(autoStart);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const clearTimer = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	const start = useCallback(() => {
		setIsRunning(true);
	}, []);

	const reset = useCallback(() => {
		clearTimer();
		setRemainingTime(initialSeconds);
		setIsRunning(false);
	}, [initialSeconds, clearTimer]);

	useEffect(() => {
		if (!isRunning) return;

		intervalRef.current = setInterval(() => {
			setRemainingTime((prev) => {
				if (prev <= 1) {
					clearTimer();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return clearTimer;
	}, [isRunning, clearTimer]);

	return {
		remainingTime,
		isExpired: remainingTime === 0,
		start,
		reset,
	};
}
