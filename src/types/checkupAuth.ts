import type { CheckupData } from './checkupData';

/** 간편인증 정보 (1차 인증 후 받는 데이터) */
export interface MultiFactorInfo {
	transactionId: string;
	jobIndex: number;
	threadIndex: number;
	multiFactorTimestamp: number;
}

/** 건강검진 조회 요청 (1차 인증) */
export interface CheckupAuthRequest {
	id: string;
	loginTypeLevel: string;
	legalName: string;
	birthdate: string;
	phoneNo: string;
	telecom: string;
	startDate: string;
	endDate: string;
	inquiryType?: string;
}

/** 1차 인증 응답 */
export interface CheckupAuthResponse {
	status: 'success' | 'error';
	data: MultiFactorInfo;
}

/** 2차 인증 요청 (1차 요청 + 인증 정보) */
export interface CheckupConfirmRequest extends CheckupAuthRequest {
	isContinue: '0' | '1';
	multiFactorInfo: MultiFactorInfo;
}

/** 건강검진 데이터 응답 (2차 인증 성공 시) */
export interface CheckupDataResponse {
	status: 'success' | 'error';
	data: CheckupData;
}