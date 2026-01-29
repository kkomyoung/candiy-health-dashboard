/** API 에러 응답 형식 */
export interface ApiErrorResponse {
	status: 'error';
	message: string;
	code: string;
}

/** API 에러 클래스 */
export class ApiError extends Error {
	code: string;

	constructor(response: ApiErrorResponse) {
		super(response.message);
		this.name = 'ApiError';
		this.code = response.code;
	}
}