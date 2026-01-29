import {
	ApiError,
	type NhisCheckupRequest,
	type NhisCheckupAuthResponse,
	type NhisCheckupConfirmRequest,
	type NhisCheckupDataResponse,
} from '@/types/api';

const API_BASE_URL = '/api';
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * 1차 인증 요청 - 간편인증 요청
 */
export async function requestCheckupAuth(params: NhisCheckupRequest): Promise<NhisCheckupAuthResponse> {
	const response = await fetch(`${API_BASE_URL}/nhis/checkup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': API_KEY,
		},
		body: JSON.stringify(params),
	});

	const data = await response.json();

	if (!response.ok || data.status === 'error') {
		throw new ApiError({
			status: 'error',
			message: data.message || `API Error: ${response.status}`,
			code: data.code || 'UNKNOWN',
		});
	}

	return data;
}

/**
 * 2차 인증 요청 - 간편인증 확인 후 데이터 조회
 */
export async function confirmCheckupAuth(params: NhisCheckupConfirmRequest): Promise<NhisCheckupDataResponse> {
	const response = await fetch(`${API_BASE_URL}/nhis/checkup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': API_KEY,
		},
		body: JSON.stringify(params),
	});

	const data = await response.json();

	if (!response.ok || data.status === 'error') {
		throw new ApiError({
			status: 'error',
			message: data.message || `API Error: ${response.status}`,
			code: data.code || 'UNKNOWN',
		});
	}

	return data;
}
