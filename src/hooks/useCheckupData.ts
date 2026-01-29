import { useState, useCallback } from 'react';
import type { NhisCheckupData } from '@/types/checkup';

const STORAGE_KEY = 'checkupData';

// sessionStorage에서 데이터 가져오기
function getStoredCheckupData(): NhisCheckupData | null {
	const stored = sessionStorage.getItem(STORAGE_KEY);
	if (!stored) return null;

	try {
		return JSON.parse(stored);
	} catch {
		sessionStorage.removeItem(STORAGE_KEY);
		return null;
	}
}

export function useCheckupData() {
	// 초기값을 sessionStorage에서 동기적으로 읽어옴
	const [data, setData] = useState<NhisCheckupData | null>(() => getStoredCheckupData());

	const clearData = useCallback(() => {
		sessionStorage.removeItem(STORAGE_KEY);
		setData(null);
	}, []);

	return {
		data,
		hasData: data !== null,
		clearData,
	};
}
