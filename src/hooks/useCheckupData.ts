import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { NhisCheckupData } from '@/types/checkup.ts';

export const CHECKUP_QUERY_KEY = 'checkupData';

export function useCheckupData() {
	const queryClient = useQueryClient();

	const { data } = useQuery<NhisCheckupData | null>({
		queryKey: [CHECKUP_QUERY_KEY],
		queryFn: async () => null,
		enabled: false,
	});

	// 캐시 초기화
	const clearData = useCallback(() => {
		queryClient.removeQueries({ queryKey: [CHECKUP_QUERY_KEY] });
	}, [queryClient]);

	return {
		data,
		hasData: data !== null && data !== undefined,
		clearData,
	};
}
