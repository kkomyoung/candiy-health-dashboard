import type { NhisCheckupData } from './checkup';

/** 건강검진 조회 요청 */
export interface NhisCheckupRequest {
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

/** 간편인증 정보 */
export interface MultiFactorInfo {
	transactionId: string;
	jobIndex: number;
	threadIndex: number;
	multiFactorTimestamp: number;
}

/** 1차 인증 응답 */
export interface NhisCheckupAuthResponse {
	status: 'success' | 'error';
	data: MultiFactorInfo;
}

/** 2차 인증 요청 (1차 요청 + 인증 정보) */
export interface NhisCheckupConfirmRequest extends NhisCheckupRequest {
	isContinue: '0' | '1';
	multiFactorInfo: MultiFactorInfo;
}

/** 건강검진 데이터 응답 */
export interface NhisCheckupDataResponse {
	status: 'success' | 'error';
	data: NhisCheckupData;
}
