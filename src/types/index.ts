// API 공통
export { ApiError, type ApiErrorResponse } from './api';

// 건강검진 인증
export type {
	MultiFactorInfo,
	CheckupAuthRequest,
	CheckupAuthResponse,
	CheckupConfirmRequest,
	CheckupDataResponse,
} from './checkupAuth';

// 건강검진 데이터
export type { CheckupOverview, CheckupReference, CheckupResult, CheckupData } from './checkupData';