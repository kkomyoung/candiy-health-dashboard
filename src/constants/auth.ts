/** 간편인증 방식 옵션 */
export const LOGIN_TYPE_OPTIONS = [
	{ value: '1', label: '카카오톡' },
	{ value: '3', label: '삼성패스' },
	{ value: '4', label: '국민은행(국민인증서)' },
	{ value: '5', label: '통신사(PASS)' },
	{ value: '6', label: '네이버' },
	{ value: '7', label: '신한은행(신한인증서)' },
	{ value: '8', label: '토스' },
	{ value: '9', label: '뱅크샐러드' },
	{ value: '10', label: '하나은행(하나인증서)' },
	{ value: '11', label: 'NH모바일인증서' },
	{ value: '12', label: '우리은행(우리인증서)' },
	{ value: '13', label: '카카오뱅크' },
] as const;

/** 통신사 옵션 */
export const TELECOM_OPTIONS = [
	{ value: '0', label: 'SKT (SKT 알뜰폰)' },
	{ value: '1', label: 'KT (KT 알뜰폰)' },
	{ value: '2', label: 'LG U+ (LG U+ 알뜰폰)' },
] as const;