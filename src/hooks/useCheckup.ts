import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestCheckupAuth, confirmCheckupAuth } from '@/services/checkupApi';
import type { NhisCheckupRequest, MultiFactorInfo } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CHECKUP_QUERY_KEY } from '@/hooks/useCheckupData.ts';

export interface UserFormInput {
	loginTypeLevel: string;
	legalName: string;
	birthdate: string;
	phoneNo: string;
	telecom: string;
}

export function useCheckup() {
	const queryClient = useQueryClient();
	const uuid = crypto.randomUUID();
	const navigate = useNavigate();

	// 1차 인증에서 사용한 요청 파라미터 저장 (2차 인증에서 필요)
	const [requestParams, setRequestParams] = useState<NhisCheckupRequest | null>(() => null);

	// 요청에 필요한 기본 파라미터 생성
	const createRequestParams = useCallback((formData: UserFormInput): NhisCheckupRequest => {
		const currentYear = new Date().getFullYear();
		return {
			id: uuid,
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
		reset: requestReset,
	} = useMutation({
		mutationFn: (formData: UserFormInput) => {
			const params = createRequestParams(formData);
			return requestCheckupAuth(params);
		},
		onSuccess: (data, variables) => {
			console.log('1차 인증 요청 완료. 간편인증을 진행해주세요.', data);
			const params = createRequestParams(variables);
			setRequestParams(params);
		},
		onError: (error) => {
			console.error('1차 인증 요청 실패', error);
		},
	});

	// 2차 인증 확인
	const {
		mutate: confirmAuthMutate,
		isPending: isConfirmPending,
		isSuccess: isConfirmSuccess,
		data: checkupData,
		error: confirmError,
		reset: confirmReset,
	} = useMutation({
		mutationFn: confirmCheckupAuth,
		onSuccess: (data) => {
			console.log('2차 인증 완료', data);
			if (data.status === 'success' && data.data) {
				queryClient.setQueryData([CHECKUP_QUERY_KEY], data.data);
				navigate('/dashboard');
			}
		},
		onError: (error) => {
			console.error('2차 인증 실패', error);
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
	const cancelAuth = () => {
		// TODO: 취소 호출하면 400 error 발생, 간편인증 취소되지 않음
		// const multiFactorInfo: MultiFactorInfo | undefined = authData?.data;
		//
		// if (requestParams && multiFactorInfo) {
		// 	try {
		// 		await confirmCheckupAuth({
		// 			...requestParams,
		// 			isContinue: '0', // cancel
		// 			multiFactorInfo,
		// 		});
		// 	} catch (error) {
		// 		console.warn('인증 취소 API 호출 실패', error);
		// 	}
		// }

		requestReset();
		confirmReset();
		setRequestParams(null);
	};

	return {
		// 1차 인증
		requestAuth,
		isRequestPending,
		isRequestSuccess: isRequestSuccess,
		authData,
		// 2차 인증
		confirmAuth,
		isConfirmPending,
		isConfirmSuccess,
		checkupData,
		confirmError,
		// 취소
		cancelAuth,
	};
}
