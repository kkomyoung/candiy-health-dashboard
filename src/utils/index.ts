/** 검진 타입에 따른 뱃지 색상 */
export const getCheckupTypeBadge = (type: string) => {
	if (type.includes('일반')) return 'bg-blue-100 text-blue-700';
	return 'bg-purple-100 text-purple-700';
};

/** 초를 분:초 형식으로 변환 */
export const formatTime = (seconds: number) => {
	const min = Math.floor(seconds / 60);
	const sec = seconds % 60;
	return `${min}:${sec.toString().padStart(2, '0')}`;
};
