import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { CheckupData } from '@/types/checkupData';

export const CHECKUP_QUERY_KEY = 'checkupData';

/**
 * 건강검진 데이터 캐시 관리 hook
 */
export function useCheckupData() {
	const queryClient = useQueryClient();

	const { data } = useQuery<CheckupData | null>({
		queryKey: [CHECKUP_QUERY_KEY],
		queryFn: async () => null,
		enabled: false,
	});

	// 캐시 초기화
	const clearData = useCallback(() => {
		queryClient.setQueryData([CHECKUP_QUERY_KEY], null);
	}, [queryClient]);

	return {
		data,
		hasData: data !== null && data !== undefined,
		clearData,
	};
}
