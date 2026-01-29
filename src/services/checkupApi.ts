import type {
	NhisCheckupRequest,
	NhisCheckupAuthResponse,
	NhisCheckupConfirmRequest,
	NhisCheckupDataResponse,
} from '@/types/api';

// 개발: Vite proxy 사용, 프로덕션: Vercel rewrites 사용
const API_BASE_URL = import.meta.env.DEV ? '/api' : '/api';
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

	if (!response.ok) {
		throw new Error(`API Error: ${response.status}`);
	}

	return response.json();
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

	if (!response.ok) {
		throw new Error(`API Error: ${response.status}`);
	}

	return response.json();
}
