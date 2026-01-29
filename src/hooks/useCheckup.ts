import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestCheckupAuth, confirmCheckupAuth } from '@/services/checkupApi';
import type { NhisCheckupRequest, MultiFactorInfo } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

export interface UserFormInput {
	loginTypeLevel: string;
	legalName: string;
	birthdate: string;
	phoneNo: string;
	telecom: string;
}

interface StoredAuthSession {
	requestParams: NhisCheckupRequest;
	multiFactorInfo: MultiFactorInfo;
	expiresAt: number; // timestamp
}

const AUTH_SESSION_KEY = 'authSession';
const AUTH_TIMEOUT_MS = 4 * 60 * 1000 + 30 * 1000; // 4분 30초

// sessionStorage에서 유효한 인증 세션 가져오기
function getStoredAuthSession(): StoredAuthSession | null {
	const stored = sessionStorage.getItem(AUTH_SESSION_KEY);
	if (!stored) return null;

	try {
		const session: StoredAuthSession = JSON.parse(stored);
		// 만료 체크
		if (Date.now() > session.expiresAt) {
			sessionStorage.removeItem(AUTH_SESSION_KEY);
			return null;
		}
		return session;
	} catch {
		sessionStorage.removeItem(AUTH_SESSION_KEY);
		return null;
	}
}

// 인증 세션 저장
function saveAuthSession(requestParams: NhisCheckupRequest, multiFactorInfo: object) {
	const session: StoredAuthSession = {
		requestParams,
		multiFactorInfo,
		expiresAt: Date.now() + AUTH_TIMEOUT_MS,
	};
	sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

// 인증 세션 삭제
function clearAuthSession() {
	sessionStorage.removeItem(AUTH_SESSION_KEY);
}

export function useCheckup() {
	const navigate = useNavigate();

	// sessionStorage에서 복원된 세션이 있는지 확인
	const [storedSession, setStoredSession] = useState<StoredAuthSession | null>(() => getStoredAuthSession());

	// 1차 인증에서 사용한 요청 파라미터 저장 (2차 인증에서 필요)
	const [requestParams, setRequestParams] = useState<NhisCheckupRequest | null>(
		() => storedSession?.requestParams ?? null
	);

	// 저장된 multiFactorInfo (새로고침 후 복원용)
	const [restoredMultiFactorInfo, setRestoredMultiFactorInfo] = useState<MultiFactorInfo | null>(
		() => storedSession?.multiFactorInfo ?? null
	);

	// 남은 시간 계산 (UI 표시용)
	const [remainingTime, setRemainingTime] = useState<number | null>(null);

	// 만료 시간 카운트다운
	useEffect(() => {
		if (!storedSession && !restoredMultiFactorInfo) {
			setRemainingTime(null);
			return;
		}

		const session = getStoredAuthSession();
		if (!session) {
			setRemainingTime(null);
			setStoredSession(null);
			setRestoredMultiFactorInfo(null);
			return;
		}

		const updateRemaining = () => {
			const remaining = Math.max(0, session.expiresAt - Date.now());
			setRemainingTime(remaining);

			if (remaining <= 0) {
				// 만료됨
				clearAuthSession();
				setStoredSession(null);
				setRestoredMultiFactorInfo(null);
				setRequestParams(null);
			}
		};

		updateRemaining();
		const interval = setInterval(updateRemaining, 1000);
		return () => clearInterval(interval);
	}, [storedSession, restoredMultiFactorInfo]);

	// 요청에 필요한 기본 파라미터 생성
	const createRequestParams = useCallback((formData: UserFormInput): NhisCheckupRequest => {
		const currentYear = new Date().getFullYear();
		return {
			id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
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
		reset: resetRequest,
	} = useMutation({
		mutationFn: async (formData: UserFormInput) => {
			const params = createRequestParams(formData);
			setRequestParams(params);
			return await requestCheckupAuth(params);
		},
		onSuccess: (data, variables) => {
			console.log('1차 인증 요청 완료. 간편인증을 진행해주세요.', data);
			// sessionStorage에 인증 세션 저장 (4분 30초 유효)
			if (data.data) {
				const params = createRequestParams(variables);
				saveAuthSession(params, data.data);
				setStoredSession(getStoredAuthSession());
			}
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
	} = useMutation({
		mutationFn: confirmCheckupAuth,
		onSuccess: (data) => {
			console.log('2차 인증 완료', data);
			if (data.status === 'success' && data.data) {
				// 인증 세션 삭제 (더 이상 필요 없음)
				clearAuthSession();
				setStoredSession(null);
				setRestoredMultiFactorInfo(null);
				// 건강검진 데이터를 sessionStorage에 저장
				sessionStorage.setItem('checkupData', JSON.stringify(data.data));
				navigate('/dashboard');
			}
		},
		onError: (error) => {
			console.error('2차 인증 실패', error);
		},
	});

	// 2차 인증 실행 (인증완료 버튼 클릭 시)
	const confirmAuth = useCallback(() => {
		// 현재 mutation 결과 또는 복원된 세션에서 multiFactorInfo 가져오기
		const multiFactorInfo = authData?.data ?? restoredMultiFactorInfo;

		if (!requestParams || !multiFactorInfo) {
			console.error('인증 정보가 없습니다.');
			return;
		}

		confirmAuthMutate({
			...requestParams,
			isContinue: '1',
			multiFactorInfo,
		});
	}, [requestParams, authData, restoredMultiFactorInfo, confirmAuthMutate]);

	// 인증 취소 (서버에 취소 요청 후 클라이언트 상태 리셋)
	const cancelAuth = useCallback(async () => {
		const multiFactorInfo = authData?.data ?? restoredMultiFactorInfo;

		if (requestParams && multiFactorInfo) {
			try {
				await confirmCheckupAuth({
					...requestParams,
					isContinue: '0',
					multiFactorInfo,
				});
			} catch (error) {
				console.warn('인증 취소 API 호출 실패 (무시됨)', error);
			}
		}
		clearAuthSession();
		setStoredSession(null);
		setRestoredMultiFactorInfo(null);
		resetRequest();
		setRequestParams(null);
	}, [requestParams, authData, restoredMultiFactorInfo, resetRequest]);

	// 복원된 세션이 있으면 isRequestSuccess처럼 동작해야 함
	const hasValidSession = !!(storedSession || restoredMultiFactorInfo) && remainingTime !== null && remainingTime > 0;

	return {
		// 1차 인증
		requestAuth,
		isRequestPending,
		isRequestSuccess: isRequestSuccess || hasValidSession,
		authData,
		// 2차 인증
		confirmAuth,
		isConfirmPending,
		isConfirmSuccess,
		checkupData,
		confirmError,
		// 취소
		cancelAuth,
		// 세션 정보
		remainingTime,
		hasValidSession,
	};
}
