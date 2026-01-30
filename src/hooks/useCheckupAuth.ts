import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestCheckupAuth, confirmCheckupAuth } from '@/services/checkupApi';
import type { CheckupAuthRequest, MultiFactorInfo } from '@/types/checkupAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CHECKUP_QUERY_KEY } from '@/hooks/useCheckupData.ts';
import { ROUTES } from '@/constants/routes.ts';

export interface UserFormInput {
	loginTypeLevel: string;
	legalName: string;
	birthdate: string;
	phoneNo: string;
	telecom: string;
}

/**
 * 건강검진 조회 인증 플로우 관리 훅
 */
export function useCheckupAuth() {
	const queryClient = useQueryClient();
	const uuidRef = useRef(crypto.randomUUID());
	const navigate = useNavigate();

	// 인증 모달 열림 상태
	const [isModalOpen, setIsModalOpen] = useState(false);

	// 1차 인증에서 사용한 요청 파라미터 저장 (2차 인증에서 필요)
	const [requestParams, setRequestParams] = useState<CheckupAuthRequest | null>(() => null);

	// 요청에 필요한 기본 파라미터 생성
	const createRequestParams = useCallback((formData: UserFormInput): CheckupAuthRequest => {
		const currentYear = new Date().getFullYear();
		return {
			id: `${uuidRef}`,
			loginTypeLevel: formData.loginTypeLevel,
			legalName: formData.legalName,
			birthdate: formData.birthdate,
			phoneNo: formData.phoneNo,
			telecom: formData.telecom,
			startDate: String(currentYear - 10),
			endDate: String(currentYear),
			inquiryType: '0',
		};
	}, []);

	// 1차 인증 요청
	const {
		mutate: requestAuth,
		isPending: isRequestPending,
		isSuccess: isRequestSuccess,
		data: authData,
		error: requestError,
		reset: requestReset,
	} = useMutation({
		mutationFn: (formData: UserFormInput) => {
			const params = createRequestParams(formData);
			return requestCheckupAuth(params);
		},
		onMutate: () => {
			// mutation 시작 시 모달 열기
			setIsModalOpen(true);
		},
		onSuccess: (_, variables) => {
			// 2차 인증에 사용하기 위해 호출 시 전달한 인자 저장
			const params = createRequestParams(variables);
			setRequestParams(params);
		},
	});

	// 2차 인증 확인
	const {
		mutate: confirmAuthMutate,
		isPending: isConfirmPending,
		error: confirmError,
		reset: confirmReset,
	} = useMutation({
		mutationFn: confirmCheckupAuth,
		onSuccess: (data) => {
			if (data.status === 'success' && data.data) {
				queryClient.setQueryData([CHECKUP_QUERY_KEY], data.data);
				navigate(ROUTES.DASHBOARD);
			}
		},
	});

	// 2차 인증 실행 (인증완료 버튼 클릭 시)
	const confirmAuth = useCallback(() => {
		const multiFactorInfo: MultiFactorInfo | undefined = authData?.data;

		if (!requestParams || !multiFactorInfo) {
			console.error('인증 정보가 없습니다.');
			return;
		}

		confirmAuthMutate({
			...requestParams,
			isContinue: '1',
			multiFactorInfo,
		});
	}, [requestParams, authData, confirmAuthMutate]);

	// 인증 취소
	const cancelAuth = useCallback(() => {
		setIsModalOpen(false);
		requestReset();
		confirmReset();
		setRequestParams(null);
	}, [requestReset, confirmReset]);

	// 1차 또는 2차 인증 에러 (모달에서 통합 표시)
	const error = requestError || confirmError;

	return {
		// 모달 상태
		isModalOpen,
		// 1차 인증
		requestAuth,
		isRequestPending,
		isRequestSuccess,
		// 2차 인증
		confirmAuth,
		isConfirmPending,
		// 에러 (통합)
		error,
		// 취소
		cancelAuth,
	};
}
