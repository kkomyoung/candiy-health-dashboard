import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCheckup } from '@/hooks/useCheckup';
import { useCheckupData } from '@/hooks/useCheckupData';
import UserInfoForm from './UserInfoForm';

// 밀리초를 "M분 SS초" 형태로 변환
function formatRemainingTime(ms: number): string {
	const totalSeconds = Math.ceil(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}분 ${seconds.toString().padStart(2, '0')}초`;
}

export default function Home() {
	const navigate = useNavigate();
	const { getUser } = useAuth();
	const { hasData } = useCheckupData();
	const {
		requestAuth,
		isRequestPending,
		isRequestSuccess,
		confirmAuth,
		isConfirmPending,
		cancelAuth,
		remainingTime,
	} = useCheckup();

	// 이미 건강검진 데이터가 있으면 대시보드로 이동
	useEffect(() => {
		if (hasData) {
			navigate('/dashboard', { replace: true });
		}
	}, [hasData, navigate]);

	const isLoading = isRequestPending || isConfirmPending;

	return (
		<div>
			<section className="pt-4 flex flex-col items-center mb-6">
				<div className="text-center mb-6">
					<h2 className="text-3xl font-bold mb-3">안녕하세요 {getUser()?.name}님!</h2>
					<p className="text-lg text-gray-600">개인정보를 입력하고 건강검진 결과를 조회해보세요</p>
				</div>
			</section>

			<section className="max-w-lg mx-auto">
				<UserInfoForm onSubmit={requestAuth} isLoading={isLoading} />
			</section>

			{/* 1차 인증 진행 중 */}
			{isRequestPending && <p className="text-center mt-4">인증 요청 중...</p>}

			{/* 1차 인증 완료 → 2차 인증 버튼 표시 */}
			{isRequestSuccess && !isConfirmPending && (
				<div className="flex flex-col items-center gap-4 mt-6">
					<p className="text-center text-gray-600">간편인증 앱에서 인증을 완료한 후 버튼을 눌러주세요</p>
					{remainingTime !== null && (
						<p className="text-center text-sm text-orange-600">
							남은 시간: {formatRemainingTime(remainingTime)}
						</p>
					)}
					<div className="flex gap-4">
						<button onClick={confirmAuth} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
							인증 완료
						</button>
						<button onClick={cancelAuth} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
							취소
						</button>
					</div>
				</div>
			)}

			{/* 2차 인증 진행 중 */}
			{isConfirmPending && <p className="text-center mt-4">건강검진 데이터를 불러오는 중...</p>}
		</div>
	);
}
